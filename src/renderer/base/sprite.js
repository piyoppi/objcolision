//
//      スプライトクラス
//      --------------
//
//      スプライトを定義します
//

export default class sprite {
    constructor(){
        this.item = null;
        this.playingAnimation = null;
        this.state = {
            frame: 0,
            timeCount: 0,
        }
    }
}
