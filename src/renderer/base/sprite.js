//
//      スプライトクラス
//      --------------
//
//      スプライトを定義します
//

import animation from './animation.js'

export default class sprite {
    constructor(){
        this.items = null;
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
