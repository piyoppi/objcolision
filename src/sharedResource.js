//
//      各種共通アイテムモジュール
//      ---------------------------
//
//      キー情報や画像データなどの共有データのためのモジュール
//

import keyboard from "./keyboard.js"

let dynamicFrictionEfficient = {};
function addFrictionEfficient(materialName1, materialName2, value){
    dynamicFrictionEfficient [`${materialName1}-${materialName2}`] = value;
    dynamicFrictionEfficient [`${materialName2}-${materialName1}`] = value;
}

export default{
    keyboardInfo: new keyboard(),
    deltaTime: 0.1,
    dynamicFrictionEfficient: dynamicFrictionEfficient,
    addFrictionEfficient: addFrictionEfficient,
}

//摩擦係数を登録
addFrictionEfficient('default', 'lift', 0.5);
