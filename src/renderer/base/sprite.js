//
//      �X�v���C�g�N���X
//      --------------
//
//      �X�v���C�g���`���܂�
//

import animation from './animation.js'

export default class sprite {
    constructor(){
        this.item = null;
        this.playingAnimation = null;
        this.state = {
            frame: 0,
            timeCount: 0,
        }
    }

    getFrame() {
        return this.playingAnimation.frame[this.state.frame];
    }

    setAnimation(animation){
        this.playingAnimation = animation;
    }
}
