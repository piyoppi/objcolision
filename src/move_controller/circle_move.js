//
//      オブジェクト円移動クラス
//      -------------------
//
//      オブジェクトを円軌道上で移動します。
//

import sharedResource from "./../sharedResource.js"

export default class circleMove{
    constructor(param = {}){
        this._cyc = 0;
        this._initialPosition = [0, 0];
        this._setForce = param.force || [0, 0];
        this._beforeSetForce = [0, 0];

        //移動パラメータ
        this.width = param.width || 50;
        this.height = param.height || 50;
        this.angularVelocity = param.angularVelocity || 6.0;

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
        item.setForce([-this.width  * squareAngularVelocity * Math.cos(this._angle),
                       -this.height * squareAngularVelocity * Math.sin(this._angle)], {forceAdd: true});
        this._angle += this.angularVelocity;
    }

}
