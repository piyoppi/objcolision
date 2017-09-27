//
//      キー情報記録クラス
//      -------------------
//
//      キー情報をキャッチして記録します
//

export default class keyboard{
    constructor(allowKeys){
        document.addEventListener( 'keydown', this._onKeyDown, false );
        document.addEventListener( 'keyup', this._onKeyUp, false );
        this.keys = {};
    }

    _onKeyDown(e){
        let keyCodeStr = e.keyCode.toString();
        this.keys[keyCodeStr].isKeyDown = true;
    }

    _onKeyUp(e){
        let keyCodeStr = e.keyCode.toString();
        this.keys[keyCodeStr].isKeyDown = false;
    }
}
