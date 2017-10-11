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
            let sprite = this.sprites[item.id];
            sprite.state.texture.frame = this.sprites[item.id].getFrame();
            sprite.item.position.set(this.camera.position[0], this.camera.position[1]);
        });

        renderer.render(this.stage);
    }

    setAnimation(item, animation) {
        this.sprites[item.id].setAnimation(animation);
    }

    addItem(item, animation = null) {
        super.addItem(item);
        let setSprite;
        if( animation && animation.renderOption.tiling ){
            setSprite = new PIXI.extras.TilingSprite();
        } else {
            setSprite = new pixi.Sprite();
        }
        
        this.sprites[item.id].item = setSprite;
        this.stage.addChild(setSprite);
    }

    removeItem(item) {
        super.remove(item);
    }
}
