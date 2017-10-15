//
//      キー情報取得クラス
//      -------------------
//
//      キー情報を取得します
//

import sharedResource from "./sharedResource.js"

export default class keyReceiver{

    //****************************************************
    //  初期化処理
    //  ---
    //  keyItems        ->  キー情報 [{name, description, keyCode}]
    //****************************************************
    constructor(keyItems){
        this._keyItems = keyItems;
        this.keyInformation = {}
    }

    //****************************************************
    //  キー情報を更新します
    //****************************************************
    reloadKeyInfo(){
        this._keyItems.forEach( item => {
            if( item.keyCode in sharedResource.keyboardInfo.keys ){
                this.keyInformation[item.name] = sharedResource.keyboardInfo.keys[item.keyCode];
            }
            else{
                this.keyInformation[item.name] = this.keyInformation[item.name] | sharedResource.keyboardInfo.createEmptyData();
            }
        });
    }

}
