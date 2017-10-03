//
//      重力クラス
//      -------------------
//
//      オブジェクトに重力を与えます
//

let gravityAcceleration = 9.8;      //重力加速度
export default class gravity{
    static add(items){
        items.forEach( item => {
            if( !item.disableGravity && !item.pin ){
                item.addForce([0, 9.8 * item.mass], null);
            }
        });
    }
}

