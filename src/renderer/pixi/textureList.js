//
//      テクスチャリストクラス
//      --------------
//
//      テクスチャを管理します
//      （実装は各描画エンジンごとに行う）
//
import textureListBase from '../base/textureList.js'
import * as pixi from 'pixi.js';

export default class textureList extends textureListBase {
    constructor() {
        super();
    }

    //********************************
    //  テクスチャの読み込み
    //  [image] -> 読み込む画像
    //  ret     -> (bool)成功の可否
    //********************************
    loadTextureFromImages(textureInformations, callback) {
        super(textureInformations, callback);
    }


    //********************************
    //  テクスチャの読み込み
    //  [url] -> URL
    //  ret   -> (bool)成功の可否
    //********************************
    loadTextureFromURLs(textureInformations, callback) {
        super.loadTextureFromURLs(textureInformations, null);
        textureInformations.forEach( info => {
            pixi.loader.add(info.name, info.url);
        });
        pixi.loader.load(()=>{
            textureInformations.forEach( info => {
                this.textures[info.name] = pixi.loader.resources[info.name].texture;
            });
            callback({result: true})
        });
    }
}
