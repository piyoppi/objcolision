//
//      各種共通アイテムモジュール
//      ---------------------------
//
//      キー情報や画像データなどの共有データのためのモジュール
//

import keyboard from "./keyboard.js"
import frameRateManager from "./frameRate.js"

//アニメーションまわり
import textures from "./renderer/pixi/textureList.js"
import animations from "./renderer/base/animationList.js"

let dynamicFrictionEfficient = {};
function addFrictionEfficient(materialName1, materialName2, value){
    dynamicFrictionEfficient [`${materialName1}-${materialName2}`] = value;
    dynamicFrictionEfficient [`${materialName2}-${materialName1}`] = value;
}

let deltaTime = 0.016;

export default{
    keyboardInfo: new keyboard(),                                   //キーボード管理
    frameRateManager: new frameRateManager(),
    deltaTime: deltaTime,                                           //1フレームあたりの時間
    frameRate: 1.0 / deltaTime,                                     //フレームレート
    dynamicFrictionEfficient: dynamicFrictionEfficient,             //摩擦力データベース
    addFrictionEfficient: addFrictionEfficient,                     //摩擦力追加処理
    gravityDirection: [0, 1],                                       //重力の方向
    textures: new textures(),                                       //テクスチャリスト
}

//摩擦係数を登録
addFrictionEfficient('default', 'lift', 0.5);

