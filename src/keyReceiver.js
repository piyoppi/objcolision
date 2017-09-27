//
//      �L�[���擾�N���X
//      -------------------
//
//      �L�[�����擾���܂�
//
//
import sharedResource from "./sharedResource.js"

export default class keyReceiver{

    //****************************************************
    //  ����������
    //  ---
    //  keyItems        ->  �L�[��� [{name, description, keyCode}]
    //****************************************************
    constructor(keyItems){
        this._keyItems = keyItems;
        this.keyInformation = {}
    }

    //****************************************************
    //  �L�[�����X�V���܂�
    //****************************************************
    reloadKeyInfo(){
        this._keyItems.forEach( item => {
            if( item.keyCode in sharedResource.keyboardInfo.keys ) this.keyInformation[item.name] = sharedResource.keyboardInfo.keys[item.keyCode];
        });
    }

}
