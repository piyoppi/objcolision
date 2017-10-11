//
//      アニメーションクラス
//      --------------
//
//      アニメーションを定義します
//

import texture from './texture.js'

export default class animation {
    constructor(){
        this.texture = null;
        this.frame = [];
        this.initialFrameIndex = 0;

        this.renderOption = {
            tiling: false,
        }
    }
}
