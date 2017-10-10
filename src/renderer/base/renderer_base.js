//
//      描画クラス
//      --------------
//
//      描画処理を定義します
//


export default class rendererBase {
    constructor(element){
        this.sprites = {};                     //スプライトたちを格納する
        this.size = {x: element.clientWidth, y: element.clientHeight};
        this.element = element;
    }

    initialize() {

    }

    render(items) {

    }

    remove(item){
        delete this.sprites[item.id];
    }
}
