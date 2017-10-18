//
//      アニメーションクラス
//      --------------
//
//      アニメーションを定義します
//

import animationBase from '../base/animation.js'
import * as pixi from 'pixi.js';

export default class animation extends animationBase {
    constructor(param = {}){
        super(param);
        if( param.frame ) {
            this.frame = this.frame.map( src => this._convertFrameInfo(src) );
        }
    }

    _convertFrameInfo(src){
        return {nextStep: src.nextStep, rect: new PIXI.Rectangle(src.rect.x, src.rect.y, src.rect.width, src.rect.height)};
    }
}
