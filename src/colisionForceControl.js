import sharedResource from "./sharedResource.js"
export default class colisionForceControl{
    constructor(){
        this._default_kx = 4;                   //めり込み回避ばね定数
        this._default_ky = 13;                   //めり込み回避ばね定数
        this._default_cx = 0;                   //めり込み回避減衰定数
        this._default_cy = 3;                   //めり込み回避減衰定数
        this._default_e = 0.3;
        this._default_dynamicFric = 0.1;
        this._deltaTime = sharedResource.deltaTime;

        this._SIN_RIGHT_ANGLE = Math.sin(3.14159266/2.0);
        this._COS_RIGHT_ANGLE = Math.cos(3.14159266/2.0);
        this._FRIC_IGNORE_DIRECTION = 0.01
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
        items.forEach( item => {
            item.forceList.forEach( forceInfo => {
                if( !forceInfo.vecFace ) return;
                if( !forceInfo.pair ) return;

                //垂直抗力を求める
                let normForceLength = forceInfo.vecFace[0] * forceInfo.addX + forceInfo.vecFace[1] * forceInfo.addY;

                //摩擦面の法線ベクトルを90度回転させると摩擦面ベクトルが得られる
                let fricFaceDirection = [forceInfo.vecFace[0] * this._COS_RIGHT_ANGLE - forceInfo.vecFace[1] * this._SIN_RIGHT_ANGLE,
                                         forceInfo.vecFace[0] * this._SIN_RIGHT_ANGLE + forceInfo.vecFace[1] * this._COS_RIGHT_ANGLE];

                //物体が動く方向を確認する
                let tempVelocity = [item.velocity[0] + item.force[0] * sharedResource.deltaTime / item.mass,
                                    item.velocity[1] + item.force[1] * sharedResource.deltaTime / item.mass];

                //摩擦面ベクトルを物体の動く方向に合わせて修正する
                let fricDirection = forceInfo.vecFace[0] * tempVelocity[1] - forceInfo.vecFace[1] * tempVelocity[0];
                if( fricDirection < this._FRIC_IGNORE_DIRECTION && fricDirection > -this._FRIC_IGNORE_DIRECTION ){
                    return;
                }
                if( fricDirection < 0 ){
                    fricFaceDirection[0] = -fricFaceDirection[0];
                    fricFaceDirection[1] = -fricFaceDirection[1];
                }

                //動摩擦力を加える
                item.addForce( [fricFaceDirection[0] * normForceLength * this._default_dynamicFric,
                                fricFaceDirection[1] * normForceLength * this._default_dynamicFric] );
                //反力を加える
                forceInfo.pair.addForce( [-fricFaceDirection[0] * normForceLength * this._default_dynamicFric,
                                          -fricFaceDirection[1] * normForceLength * this._default_dynamicFric] );
                
            });
        });
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
                //if( item.id === 1 && colisionInfo.pair.id === 3) console.log(`${item.id} ${colisionInfo.pair.id} | ${-colisionInfo.colisionFaceVec[0]} ${-colisionInfo.colisionFaceVec[1]} | ${addForceX} ${addForceY}`);
                item.addForce([addForceX, addForceY], colisionInfo.colisionFaceVec, colisionInfo.pair);
                //被衝突オブジェクトには反作用の力が加わる
                colisionInfo.pair.addForce([-addForceX, -addForceY], [-colisionInfo.colisionFaceVec[0], -colisionInfo.colisionFaceVec[1]], item);
            });
        });
    }

    //****************************************************
    //  めりこみ解決
    //****************************************************
    _modifySinking(items){
        items.forEach( item => {
            item.colisionInfoList.forEach( colisionInfo => {
                //ばねとダンパ
                if( colisionInfo.distX && colisionInfo.absDistX < colisionInfo.absDistY ){
                    item.force[0] += -this._default_kx * colisionInfo.distX;
                    item.force[0] += -this._default_cx * item.velocity[0];
                    item.addForce([-this._default_cx * item.velocity[0] - this._default_kx * colisionInfo.distX, 0], colisionInfo.colisionFaceVec, colisionInfo.pair);
                    //console.log(`${item.force[0]} ${item.force[1]}`);
                }
                else if( colisionInfo.distY ){
                    item.forceList.push( { addX: 0, addY: item.force[1], face: colisionInfo.colisionFaceVec } );
                    item.addForce([0, -this._default_cy * item.velocity[1]-this._default_ky * colisionInfo.distY], colisionInfo.colisionFaceVec, colisionInfo.pair);
                    //console.log(`${item.force[0]} ${item.force[1]}`);
                }
            });
        });
    }
}
