export default class colisionForceControl{
    constructor(){
        this._default_k = 0.01;                   //めり込み回避ばね定数
    }

    changeForce(items){
        items.forEach( item => {
            item.colisionInfoList.forEach( colisionInfo => {
                //ばね力
                if( colisionInfo.distX && colisionInfo.absDistX < colisionInfo.absDistY ){
                    item.force[0] += -this._default_k * colisionInfo.distX;
                    console.log(`${item.force[0]} ${item.force[1]}`);
                }
                else if( colisionInfo.distY ){
                    item.force[1] += -this._default_k * colisionInfo.distY;
                    console.log(`${item.force[0]} ${item.force[1]}`);
                }
            });
        });
    }
}
