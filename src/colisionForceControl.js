import sharedResource from "./sharedResource.js"
export default class colisionForceControl{
    constructor(){
        this._default_kx = 140;                   //めり込み回避ばね定数
        this._default_ky1 = 1300;                   //めり込み回避ばね定数
        this._default_ky2 = 800;                   //めり込み回避ばね定数
        this._default_cx = 10;                   //めり込み回避減衰定数
        this._default_cy1 = 50;                   //めり込み回避減衰定数
        this._default_cy2 = 20;                   //めり込み回避減衰定数
        this._default_e = 0.0;
        this._default_dynamicFric = 0.1;
        this._default_staticFric = 0.4;
        this._deltaTime = sharedResource.deltaTime;

        this._SIN_RIGHT_ANGLE = Math.sin(3.14159266/2.0);
        this._COS_RIGHT_ANGLE = Math.cos(3.14159266/2.0);
        this._FRIC_IGNORE_DIRECTION = 0.01;
    }

    changeForce(items){
        this._changeForce(items);
        this._modifySinking(items);
        this._changeFriction(items);
    }

    //****************************************************
    //  摩擦
    //****************************************************
    _changeFriction(items){
        //console.log("-------");
        let forceBuffer = {};
        items.forEach( item => {
            item.forceList.forEach( forceInfo => {
                if( !forceInfo.vecFace ) return;
                if( !forceInfo.pair ) return;
                if( item.disableExternalForce ) return;

                //垂直抗力を求める
                let normForceLength = Math.abs(forceInfo.vecFace[0] * forceInfo.addX + forceInfo.vecFace[1] * forceInfo.addY);

                //摩擦面の法線ベクトルを90度回転させると摩擦面ベクトルが得られる
                let fricFaceDirection = [forceInfo.vecFace[0] * this._COS_RIGHT_ANGLE - forceInfo.vecFace[1] * this._SIN_RIGHT_ANGLE,
                                         forceInfo.vecFace[0] * this._SIN_RIGHT_ANGLE + forceInfo.vecFace[1] * this._COS_RIGHT_ANGLE];

                //物体が動く方向を確認する
                let tempVelocity = [item.velocity[0] - forceInfo.pair.velocity[0], //+ item.force[0] * sharedResource.deltaTime / item.mass,
                                    item.velocity[1] - forceInfo.pair.velocity[1]];// + item.force[1] * sharedResource.deltaTime / item.mass];

                //摩擦面ベクトルを物体の動く方向に合わせて修正する
                let fricDirection = forceInfo.vecFace[0] * tempVelocity[1] - forceInfo.vecFace[1] * tempVelocity[0];
                if( fricDirection < this._FRIC_IGNORE_DIRECTION && fricDirection > -this._FRIC_IGNORE_DIRECTION ){
                    return;
                }
                if( fricDirection > 0 ){
                    fricFaceDirection[0] = -fricFaceDirection[0];
                    fricFaceDirection[1] = -fricFaceDirection[1];
                }
                
                //力バッファアイテムが存在しない場合はオブジェクトを作成する
                if( !forceBuffer[item.id] ) forceBuffer[item.id] = {force: [0, 0], item: item};
                if( !forceBuffer[forceInfo.pair.id] ) forceBuffer[forceInfo.pair.id] = {force: [0, 0], item: forceInfo.pair};

                let addForceX = 0, addForceY = 0;
                
                //静止摩擦力
                let itemForceFaceDir = Math.abs(fricFaceDirection[0] * item.force[0] + fricFaceDirection[1] * item.force[1]);
                let staticFrictionForce = Math.abs(this._default_staticFric * normForceLength);
                //if( item.id === 1 ) console.log(`${forceInfo.addY} ${staticFrictionForce} ${itemForceFaceDir}`);
                if( (itemForceFaceDir < staticFrictionForce) && item.velocity[0] === 0 && item.velocity[1] === 0 ){ //&& (fricDirection < this._FRIC_IGNORE_DIRECTION && fricDirection > -this._FRIC_IGNORE_DIRECTION) ){
                    addForceX = fricFaceDirection[0] * itemForceFaceDir;
                    addForceY = fricFaceDirection[1] * itemForceFaceDir;
                    forceBuffer[item.id].force[0] += addForceX;
                    forceBuffer[item.id].force[1] += addForceY;
                    //console.log(`[STATIC]  ${fricDirection}, ${itemForceFaceDir}, ${staticFrictionForce}`);
                }
                else{
                
                    let dynamicFricEfficient = sharedResource.dynamicFrictionEfficient[`${item.materialName}-${forceInfo.pair.materialName}`] || this._default_dynamicFric;
                    addForceX = fricFaceDirection[0] * normForceLength * dynamicFricEfficient;
                    addForceY = fricFaceDirection[1] * normForceLength * dynamicFricEfficient;

                    //動摩擦力を加える
                    forceBuffer[item.id].force[0] += addForceX;
                    forceBuffer[item.id].force[1] += addForceY;

                    //加えた摩擦によって矛盾ある方向に進んでしまう場合は速度を０にするように力を修正する
                    let itemVelocity = [ item.velocity[0] + forceBuffer[item.id].force[0] / item.mass * sharedResource.deltaTime, 
                                         item.velocity[1] + forceBuffer[item.id].force[1] / item.mass * sharedResource.deltaTime ]; 
                    if( itemVelocity[0] * fricFaceDirection[0] + itemVelocity[1] * fricFaceDirection[1] > 0 ){
                        forceBuffer[item.id].force[0] = fricFaceDirection[0] * item.mass * (item.velocity[0] - forceInfo.pair.velocity[0]) / sharedResource.deltaTime;
                        forceBuffer[item.id].force[1] = fricFaceDirection[1] * item.mass * (item.velocity[1] - forceInfo.pair.velocity[1]) / sharedResource.deltaTime;
                    }

                    //////反力を加える
                    //  forceBuffer[forceInfo.pair.id].force[0] += -fricFaceDirection[0] * normForceLength * this._default_dynamicFric;
                    //  forceBuffer[forceInfo.pair.id].force[1] += -fricFaceDirection[1] * normForceLength * this._default_dynamicFric;
                }

                //console.log(`${item.id} ${forceInfo.pair.id} | ${addForceX} ${addForceY} | ${normForceLength} | ${forceInfo.vecFace[0]}, ${forceInfo.vecFace[1]}`);
            });
        });

        for(let key in forceBuffer){
            forceBuffer[key].item.addForce(forceBuffer[key].force, null, null, {description: "fric"});
            forceBuffer[key].item.isEfficientFriction = true;
        }
    }

    //****************************************************
    //  衝突時の力交換
    //****************************************************
    _changeForce(items){
        items.forEach( item => {
            item.colisionInfoList.forEach( colisionInfo => {
                let relativeVelocity = [ item.velocity[0] - colisionInfo.pair.velocity[0], item.velocity[1] - colisionInfo.pair.velocity[1] ];
                let colisionMassParam = (1.0 + this._default_e) * (item.mass * colisionInfo.pair.mass) / (item.mass + colisionInfo.pair.mass);
                let addForceX = colisionMassParam * relativeVelocity[0] / this._deltaTime * -colisionInfo.colisionFaceVec[0];
                let addForceY = colisionMassParam * relativeVelocity[1] / this._deltaTime * -colisionInfo.colisionFaceVec[1];
                //if( item.id === 1 && colisionInfo.pair.id === 2) console.log(`${item.id} ${colisionInfo.pair.id} | ${-colisionInfo.colisionFaceVec[0]} ${-colisionInfo.colisionFaceVec[1]} | ${addForceX} ${addForceY}`);
                //if( item.id === 2 && colisionInfo.pair.id === 1) console.log(`${item.id} ${colisionInfo.pair.id} | ${-colisionInfo.colisionFaceVec[0]} ${-colisionInfo.colisionFaceVec[1]} | ${addForceX} ${addForceY}`);
                item.addForce([addForceX, addForceY], colisionInfo.colisionFaceVec, colisionInfo.pair, {description: "changeForce"});
                //被衝突オブジェクトには反作用の力が加わる
                colisionInfo.pair.addForce([-addForceX, -addForceY], [-colisionInfo.colisionFaceVec[0], -colisionInfo.colisionFaceVec[1]], item, {description: "changeForce"});
            });
        });
    }

    //****************************************************
    //  めりこみ解決
    //****************************************************
    _modifySinking(items){
        items.forEach( item => {
            if( item.disableExternalForce ) return;
            item.colisionInfoList.forEach( colisionInfo => {
                //ばねとダンパ(動かない物体とのめり込み判定の場合は位置も修正してしまう)
                if( colisionInfo.distX && colisionInfo.absDistX < colisionInfo.absDistY ){
                    item.addForce([-this._default_cx * item.velocity[0] - this._default_kx * colisionInfo.distX, 0], colisionInfo.colisionFaceVec, colisionInfo.pair, {description: "modifySinking_X1"});
                    //if( colisionInfo.pair.pin ){
                    //    item.position[0] -= colisionInfo.distX;
                    //}
                }
                else if( colisionInfo.distY ){
                    if (colisionInfo.distY > 0) {
                        item.addForce([0, -this._default_cy1 * item.velocity[1] - this._default_ky1 * colisionInfo.distY], colisionInfo.colisionFaceVec, colisionInfo.pair, {description: "modifySinking_Y1"});
                    }
                    else{
                        item.addForce([0, -this._default_cy2 * item.velocity[1] - this._default_ky2 * colisionInfo.distY], colisionInfo.colisionFaceVec, colisionInfo.pair, {description: "modifySinking_Y2"});
                    }
                    //if( colisionInfo.pair.pin ){
                    //    item.position[1] -= colisionInfo.distY;
                    //}
                }
            });
        });
    }
}
