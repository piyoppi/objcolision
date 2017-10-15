//
//      重力クラス
//      -------------------
//
//      オブジェクトに重力を与えます
//

let gravityAcceleration = 1000;      //重力加速度
export default class gravity{
    static add(items){
        items.forEach( item => {
            if( !item.disableGravity && !item.pin ){
                item.addForce([0, gravityAcceleration * item.mass], null, null, {description: "gravity", isGravity: true});
            }
        });
    }
}

