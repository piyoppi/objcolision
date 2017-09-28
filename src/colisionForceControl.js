import sharedResource from "./sharedResource.js"
export default class colisionForceControl{
    constructor(){
        this._default_k = 9;                   //めり込み回避ばね定数
        this._default_c = 1;                   //めり込み回避ばね定数
        this._default_e = 0.3;
        this._deltaTime = sharedResource.deltaTime;
    }

    changeForce(items){
        this._modifySinking(items);
        this._changeForce(items);
    }

    //****************************************************
    //  衝突時の力交換
    //****************************************************
    _changeForce(items){
        items.forEach( item => {
            item.colisionInfoList.forEach( colisionInfo => {
                let relativeVelocity = [ -item.velocity[0] + colisionInfo.pair.velocity[0], -item.velocity[1] + colisionInfo.pair.velocity[1] ];
                let colisionMassParam = (1.0 + this._default_e) * (item.mass * colisionInfo.pair.mass) / (item.mass + colisionInfo.pair.mass);
                let addForceX = colisionMassParam * relativeVelocity[0] / this._deltaTime;
                let addForceY = colisionMassParam * relativeVelocity[1] / this._deltaTime;
                console.log(`${item.id} ${colisionInfo.pair.id} | ${addForceX} ${addForceY}`);
                item.force[0] += addForceX;
                item.force[1] += addForceY;
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
                    item.force[0] += -this._default_k * colisionInfo.distX;
                    item.force[0] += -this._default_c * item.velocity[0];
                    //console.log(`${item.force[0]} ${item.force[1]}`);
                }
                else if( colisionInfo.distY ){
                    item.force[1] += -this._default_k * colisionInfo.distY;
                    item.force[1] += -this._default_c * item.velocity[1];
                    //console.log(`${item.force[0]} ${item.force[1]}`);
                }
            });
        });
    }
}
