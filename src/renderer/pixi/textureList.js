//
//      �e�N�X�`�����X�g�N���X
//      --------------
//
//      �e�N�X�`�����Ǘ����܂�
//      �i�����͊e�`��G���W�����Ƃɍs���j
//
import textureListBase from '../base/textureList.js'
import * as pixi from 'pixi.js';

export default class textureList extends textureListBase {
    constructor() {
        super();
    }

    //********************************
    //  �e�N�X�`���̓ǂݍ���
    //  [textureInformations] -> ���[�h��� {name, url}
    //  ret                   -> (obj)�����̉�
    //********************************
    loadTextureFromImages(textureInformations, callback) {
        super(textureInformations, callback);
    }


    //********************************
    //  �e�N�X�`���̓ǂݍ���
    //  [textureInformations] -> ���[�h��� {name, url}
    //  ret                   -> (obj)�����̉�
    //********************************
    loadTextureFromURLs(textureInformations, callback) {
        super.loadTextureFromURLs(textureInformations, null);
        textureInformations.forEach( info => {
            pixi.loader.add(info.name, info.url);
        });
        pixi.loader.load(()=>{
            textureInformations.forEach( info => {
                this.textures[info.name] = pixi.loader.resources[info.name].texture;
            });
            callback({result: true})
        });
    }
}
