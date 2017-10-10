//
//      •`‰æƒNƒ‰ƒX(PIXIJS)
//      --------------
//
//      •`‰æˆ—‚ğ’è‹`‚µ‚Ü‚·
//
import rendererBase from '../base/renderer_base.js'
import * as pixi from 'pixi.js';

export default class renderer extends rendererBase {
    constructor(element){
        super(element);
        this.pixijs = pixi.autoDetectRenderer(this.size.x, this.size.y, {antialias: false, transparent: false, resolution: 1});
        this.stage = new pixi.Container();
    }

    initialize() {
        super.initialize();
    }

    render(items) {
        
    }

    remove(item) {
        super.remove(item);
    }
}
