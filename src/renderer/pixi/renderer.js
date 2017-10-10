//
//      •`‰æƒNƒ‰ƒX(PIXIJS)
//      --------------
//
//      •`‰æˆ—‚ð’è‹`‚µ‚Ü‚·
//
import rendererBase from '../base/renderer_base.js'
import sprite from './sprite.js'
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
        items.forEach( item => {
            this.sprites[item.id].state.texture.frame = this.sprites[item.id].getFrame();
        });
    }

    setAnimation(item, animation) {
        this.sprites[item.id].setAnimation(animation);
    }

    addItem(item) {
        super.addItem(item);
        this.sprites[item.id].item = new pixi.Sprite();
    }

    removeItem(item) {
        super.remove(item);
    }
}
