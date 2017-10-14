//
//      描画クラス(PIXIJS)
//      --------------
//
//      描画処理を定義します
//
import rendererBase from '../base/renderer_base.js'
import sprite from './sprite.js'
import * as pixi from 'pixi.js';

export default class renderer extends rendererBase {
    constructor(element){
        super(element);
        this.renderer = pixi.autoDetectRenderer(this.size.x, this.size.y, {antialias: false, transparent: false, resolution: 1});
        element.appendChild(this.renderer.view);
        this.stage = new pixi.Container();
    }

    initialize() {
        super.initialize();
    }

    render(items) {
        items.forEach( item => {
            let sprite = this.sprites[item.id];
            if( !sprite ) return;
            sprite.state.texture.frame = this.sprites[item.id].getFrame().rect;
            sprite.items.forEach( spriteObj => {
                spriteObj.item.width = item.width;
                spriteObj.item.height = item.height;
                spriteObj.item.position.set(item.position[0] - this.camera.position[0], item.position[1] - this.camera.position[1]);
            });
        });

        this.renderer.render(this.stage);
    }

    setAnimation(item, animation) {
        this.sprites[item.id].setAnimation(animation);
    }

    addItem(item, animation = null) {
        super.addItem(item);
        let setSprite;
        this.sprites[item.id] = new sprite();
        if( animation && animation.renderOption.tiling ){
            setSprite = new PIXI.extras.TilingSprite(animation.texture.item, item.width, item.height);
            this.sprites[item.id].items = [{type: "tiling", item: setSprite}];
        } else {
            setSprite = new pixi.Sprite();
            this.sprites[item.id].items = [{type: "sprite", item: setSprite}];
        }
        if( animation ) this.setAnimation(item, animation);
        this.stage.addChild(setSprite);
    }

    removeItem(item) {
        super.remove(item);
    }
}
