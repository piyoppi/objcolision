//
//      キー情報記録クラス
//      -------------------
//
//      キー情報をキャッチして記録します
//

export default class keyboard{
    constructor(){
        document.addEventListener( 'keydown', e=>this._onKeyDown(e), false );
        document.addEventListener( 'keyup', e=>this._onKeyUp(e), false );
        this.keys = {};
        console.log('Initialized keyboard');
    }

    _onKeyDown(e){
        let keyCodeStr = e.keyCode.toString();
        if( !this.keys[keyCodeStr] ) this.keys[keyCodeStr] = {};
        this.keys[keyCodeStr].isKeyDown = true;
        if( !e.ctrlKey ){
            e.preventDefault();
        }
    }

    _onKeyUp(e){
        let keyCodeStr = e.keyCode.toString();
        if( !this.keys[keyCodeStr] ) this.keys[keyCodeStr] = {};
        this.keys[keyCodeStr].isKeyDown = false;
    }

    createEmptyData(){
        return {isKeyDown: false};
    }
}
