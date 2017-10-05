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

let startTime = new Date().getTime();
let frameCount = 0;
let measuredFramerate = 0;
function getFrameRate(){
    let nowTime = new Date().getTime();
    if( nowTime - startTime > 1000 ) {
        measuredFramerate = frameCount;
        frameCount = 0;
    }
    frameCount++;
}

let deltaTime = 0.016;

export default{
    keyboardInfo: new keyboard(),
    deltaTime: deltaTime,
    frameRate: 1.0 / deltaTime,
    dynamicFrictionEfficient: dynamicFrictionEfficient,
    addFrictionEfficient: addFrictionEfficient,
    startTime: startTime,
    measuredFramerate: measuredFramerate,
}

//摩擦係数を登録
addFrictionEfficient('default', 'lift', 0.5);

