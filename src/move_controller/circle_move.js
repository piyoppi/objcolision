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
        this.width = param.width || 150.0;
        this.height = param.height || 100.0;
        this.angularVelocity = param.angularVelocity || 1;
        this.deltaAnglePerFrame = this.angularVelocity / sharedResource.frameRate;

        //状態管理
        this._angle = 0.0;
        this._initialized = false;
    }

    initialize(item){
        //初期地点を控えておく
        this._initialPosition[0] = item.position[0];
        this._initialPosition[1] = item.position[1];
        //初速を与える
        //（x方向の初速は、離散的な計算による誤差を考慮して回転中心をまたぐように初速を与えてみている状態）
        item.velocity[0] = -this.width * this.angularVelocity * Math.sin(this.deltaAnglePerFrame/2); k
        item.velocity[1] = this.height * this.angularVelocity;

        this._initialized = true;
    }

    execute(item){
        if( !this._initialized) this.initialize(item);

        this._angle += this.deltaAnglePerFrame;
        let squareAngularVelocity = this.angularVelocity * this.angularVelocity;
        let cos = Math.cos(this._angle);
        let sin = Math.sin(this._angle);

        item.setForce([-this.width  * squareAngularVelocity * cos,
                       -this.height * squareAngularVelocity * sin], {forceAdd: true});

        //角度が一周したらリセットする
        if( this._angle > anglePerCycle ){
            this._angle = this._angle - anglePerCycle;
        }

    }

}
