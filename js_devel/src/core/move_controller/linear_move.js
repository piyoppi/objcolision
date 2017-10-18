//
//      オブジェクト直線移動クラス
//      -------------------
//
//      オブジェクトを直線的に移動します。指定地点で折り返します
//

import sharedResource from "./../sharedResource.js"

export default class linearMove{
    constructor(param = {}){
        this._cyc = 0;
        this._initialized = false;
        this._setForce = param.force || [0, 0];

        //状態管理
        this._initialPosition = [0, 0];
        this._isTurning = false;
        this._beforeSetForce = [0, 0];

        //移動パラメータ
        this._maxCycle = param.maxCycle || 100;
    }

    initialize(item){
        //初期地点を控えておく
        this._initialPosition[0] = item.position[0];
        this._initialPosition[1] = item.position[1];
        this._initialized = true;
    }

    execute(item){
        if( this._initialized) this.initialize();

        //切り替え地点に到着したら切り替えを実行する
        if( this._cyc === 0 ){
            let setForce = this._isTurning ? [this._setForce[0], this._setForce[1]] : [-this._setForce[0], -this._setForce[1]];
            item.setForce([setForce[0] - this._beforeSetForce[0], setForce[1] - this._beforeSetForce[1]], {forceAdd: true});
            this._isTurning = !this._isTurning;
            this._beforeSetForce = setForce;
        }

        this._cyc++;
        if( this._maxCycle < this._cyc ) this._cyc = 0;

    }

}
