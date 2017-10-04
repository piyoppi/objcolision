//
//      オブジェクト円移動クラス
//      -------------------
//
//      オブジェクトを円軌道上で移動します。
//

import sharedResource from "./../sharedResource.js"

let anglePerCycle = 3.14159266 * 2;
let anglePerCycleHalf = anglePerCycle / 2.0;

export default class circleMove{
    constructor(param = {}){
        this._cyc = 0;
        this._initialPosition = [0, 0];
        this._setForce = param.force || [0, 0];
        this._beforeSetForce = [0, 0];

        //移動パラメータ
        this.width = param.width || 25;
        this.height = param.height || 25;
        this.angularVelocity = param.angularVelocity || 6.0;
        this.deltaAnglePerFrame = this.angularVelocity / sharedResource.frameRate;

        //状態管理
        this._angle = 0.0;
    }

    initialize(item){
        //初期地点を控えておく
        this._initialPosition[0] = item.position[0];
        this._initialPosition[1] = item.position[1];
        this._initialized = true;
    }

    execute(item){
        if( this._initialized) this.initialize();

        let squareAngularVelocity = this.angularVelocity * this.angularVelocity;
        let cos = Math.cos(this._angle);
        let sin = Math.sin(this._angle);
        //if( this._angle > anglePerCycleHalf ) {
        //    sin = -sin;
        //}

        console.log(`${sin}, ${cos} ${this._angle}`);

        item.setForce([-this.width  * squareAngularVelocity * cos,
                       -this.height * squareAngularVelocity * sin], {forceAdd: true});
        this._angle += this.deltaAnglePerFrame;

        //角度が一周したらリセットする
        if( this._angle > anglePerCycle ){
            this._angle = this._angle - anglePerCycle;
        }
    }

}
