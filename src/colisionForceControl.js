import sharedResource from "./sharedResource.js"
export default class colisionForceControl{
    constructor(){
        this._default_kx = 4;                   //めり込み回避ばね定数
        this._default_ky = 13;                   //めり込み回避ばね定数
        this._default_cx = 0;                   //めり込み回避減衰定数
        this._default_cy = 3;                   //めり込み回避減衰定数
        this._default_e = 0.3;
        this._deltaTime = sharedResource.deltaTime;
    }

    changeForce(items){
        this._changeForce(items);
        this._modifySinking(items);
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
                item.force[0] += addForceX;
                item.force[1] += addForceY;
                item.forceList.push( { addX: addForceX, addY: addForceY, face: colisionInfo.colisionFaceVec } );
                //被衝突オブジェクトには反作用の力が加わる
                colisionInfo.pair.force[0] -= addForceX;
                colisionInfo.pair.force[1] -= addForceY;
                colisionInfo.pair.forceList.push( { addX: -addForceX, addY: -addForceY, face: [-colisionInfo.colisionFaceVec[0], -colisionInfo.colisionFaceVec[1]] } );
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
                    item.forceList.push( { addX: item.force[0], addY: 0, face: colisionInfo.colisionFaceVec } );
                    //console.log(`${item.force[0]} ${item.force[1]}`);
                }
                else if( colisionInfo.distY ){
                    item.force[1] += -this._default_ky * colisionInfo.distY;
                    item.force[1] += -this._default_cy * item.velocity[1];
                    item.forceList.push( { addX: 0, addY: item.force[1], face: colisionInfo.colisionFaceVec } );
                    //console.log(`${item.force[0]} ${item.force[1]}`);
                }
            });
        });
    }
}
