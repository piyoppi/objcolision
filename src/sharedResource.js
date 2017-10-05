//
//      各種共通アイテムモジュール
//      ---------------------------
//
//      キー情報や画像データなどの共有データのためのモジュール
//

import keyboard from "./keyboard.js"
import frameRateManager from "./frameRate.js"

let dynamicFrictionEfficient = {};
function addFrictionEfficient(materialName1, materialName2, value){
    dynamicFrictionEfficient [`${materialName1}-${materialName2}`] = value;
    dynamicFrictionEfficient [`${materialName2}-${materialName1}`] = value;
}

let deltaTime = 0.016;

export default{
    keyboardInfo: new keyboard(),
    frameRateManager: new frameRateManager(),
    deltaTime: deltaTime,
    frameRate: 1.0 / deltaTime,
    dynamicFrictionEfficient: dynamicFrictionEfficient,
    addFrictionEfficient: addFrictionEfficient,
    gravityDirection: [0, 1],
}

//摩擦係数を登録
addFrictionEfficient('default', 'lift', 0.5);

