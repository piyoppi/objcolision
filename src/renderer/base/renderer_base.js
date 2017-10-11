//
//      描画クラス
//      --------------
//
//      描画処理を定義します
//
import camera from './camera.js'
import sprite from '../base/sprite.js'

export default class rendererBase {
    constructor(element){
        this.sprites = {};                     //スプライトたちを格納する
        this.size = {x: element.clientWidth, y: element.clientHeight};
        this.element = element;
        this.camera = new camera();
    }

    getSprite( item ) {
        return this.sprites[item.id];
    }

    initialize() {

    }

    render(items) {

    }

    addItem(item, animation = null) {
        this.sprites[item.id] = [new sprite()];
    }

    removeItem(item){
        delete this.sprites[item.id];
    }
}
