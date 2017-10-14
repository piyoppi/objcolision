//
//      スプライトクラス
//      --------------
//
//      スプライトを定義します
//

import * as pixi from 'pixi.js';
import spriteBase from '../base/sprite.js'

export default class spritePixi extends spriteBase {
    constructor(){
        super();
        this.state.texture = null;          //描画中のテクスチャ（テクスチャリストからのClone）
    }

    setAnimation(animation){
        super.setAnimation(animation);
        this.state.texture = this.playingAnimation.texture.item.clone();
        this.items.forEach( item => {
            item.texture = this.state.texture;
        });
    }
}
