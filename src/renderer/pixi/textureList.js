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
    //  [image] -> �ǂݍ��މ摜
    //  ret     -> (bool)�����̉�
    //********************************
    loadTextureFromImages(textureInformations, callback) {
        super(textureInformations, callback);
    }


    //********************************
    //  �e�N�X�`���̓ǂݍ���
    //  [url] -> URL
    //  ret   -> (bool)�����̉�
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
