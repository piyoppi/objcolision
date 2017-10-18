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

    nextAnimation() {
        let nowFrame = this.getFrame();
        if( this.state.timeCount >= nowFrame.nextStep ) {
            if( this.state.frame < (this.playingAnimation.frame.length-1) ){
                this.state.frame++;
            } else {
                this.state.frame = 0;
            }
            this.state.timeCount = 0;
        } else {
            this.state.timeCount++;
        }
    }

    setAnimation(animation){
        this.playingAnimation = animation;
    }
}
