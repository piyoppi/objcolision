//
//      テクスチャリストクラス
//      --------------
//
//      テクスチャを管理します
//      （実装は各描画エンジンごとに行う）
//

export default class textureListBase {
    constructor() {
        this.textures = [];
    }

    //********************************
    //  テクスチャの読み込み
    //  image -> 読み込む画像
    //  ret   -> (bool)成功の可否
    //********************************
    loadTextureFromImage(image) {
        return false;
    }


    //********************************
    //  テクスチャの読み込み
    //  url -> URL
    //  ret -> (bool)成功の可否
    //********************************
    loadTextureFromURL(url) {
        return false;
    }
}
