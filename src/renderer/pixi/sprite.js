//
//      �X�v���C�g�N���X
//      --------------
//
//      �X�v���C�g���`���܂�
//

import * as pixi from 'pixi.js';
import rendererBase from '../base/sprite.js'

export default class spritePixi {
    constructor(){
        super();
    }

    setAnimation(animation){
        super.setAnimation(animation);
        this.state.texture = this.playingAnimation.texture.clone();
        this.item.texture = this.state.texture;
    }
}
