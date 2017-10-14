//
//      テクスチャリストクラス
//      --------------
//
//      テクスチャを管理します
//      （実装は各描画エンジンごとに行う）
//

export default class textureListBase {
    constructor() {
        this.textures = {};
    }

    //********************************
    //  テクスチャの読み込み
    //  [textureInformations] -> ロード情報 {name, url}
    //  ret                   -> (obj)成功の可否
    //********************************
    loadTextureFromImage(textureInformations, callback) {
        callback({result: false});
    }

    //********************************
    //  テクスチャの読み込み
    //  [textureInformations] -> ロード情報 {name, url}
    //  ret                   -> (obj)成功の可否
    //********************************
    loadTextureFromURLs(textureInformations, callback) {
        textureInformations.forEach( info => {
            this.textures[info.name] = {name: info.name, item: null};
        });
        if(callback !== null) callback({result: false});
    }

    toJSON(){
        return JSON.stringify(this.textures);
    }
}
