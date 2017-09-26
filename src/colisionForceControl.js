export default class colisionForceControl{
    constructor(){
        this._default_k = 15;                   //めり込み回避ばね定数
        this._default_c = 13;                   //めり込み回避ばね定数
    }

    changeForce(items){
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
