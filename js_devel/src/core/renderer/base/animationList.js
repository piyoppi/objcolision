//
//      アニメーションリストクラス
//      --------------
//
//      アニメーションを管理します
//

export default class animationList {
    constructor() {
        this.animations = {};
    }

    add(info) {
        this.animations[info.name] = info.animation;
    }

    toJSON(){
        return JSON.stringify(this.animations);
    }

    fromJSON(str) {

    }
}
