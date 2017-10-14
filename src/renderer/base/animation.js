//
//      アニメーションクラス
//      --------------
//
//      アニメーションを定義します
//

import texture from './texture.js'

export default class animation {
    constructor(param){
        this.texture = param.texture || null;
        this.frame = param.frame || [];
        this.initialFrameIndex = 0;

        this.renderOption = {
            tiling: false,
        }
    }
}
