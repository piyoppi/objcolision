//
//      �`��N���X
//      --------------
//
//      �`�揈�����`���܂�
//
import sprite from '../base/sprite.js'

export default class rendererBase {
    constructor(element){
        this.sprites = {};                     //�X�v���C�g�������i�[����
        this.size = {x: element.clientWidth, y: element.clientHeight};
        this.element = element;
    }

    getSprite( item ) {
        return this.sprites[item.id];
    }

    initialize() {

    }

    render(items) {

    }

    addItem(item) {
        this.sprites[item.id] = [new sprite()];
    }

    removeItem(item){
        delete this.sprites[item.id];
    }
}
