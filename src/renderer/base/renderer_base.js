//
//      �`��N���X
//      --------------
//
//      �`�揈�����`���܂�
//


export default class rendererBase {
    constructor(element){
        this.sprites = {};                     //�X�v���C�g�������i�[����
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
