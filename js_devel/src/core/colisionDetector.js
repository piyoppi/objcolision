//
//      衝突検知クラス
//      --------------
//
//      オブジェクト同士の衝突を検知します
//

import sharedResource from "./sharedResource.js"

export default class colisionDetector {
    constructor(fieldWidth, fieldHeight, level, items = null){
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;
        this._level = level;
        this._linearQuaternaryTree = [];
        this._makeLinearQuaternaryTree();
        if( items ){
            items.forEach( item => this.updateMortonTree(item) );
        }
    }

    //****************************************************
    //  モートンツリーの初期化
    //****************************************************
    _makeLinearQuaternaryTree(){
        let cycle = ( Math.pow(4, this._level+1)-1.0 ) / 3.0;
        for( let i=0; i<cycle; i++ ){
            this._linearQuaternaryTree.push({items: {}});
        }
        //最も小さい領域のカウント
        let lowLevelCellCount = Math.pow( 2, this._level );
        //最も小さい分割領域の大きさを計算
        this._lowLevelCellSize = [ this._fieldWidth / lowLevelCellCount, this._fieldHeight / lowLevelCellCount ];
    }

    //****************************************************
    //  モートンツリーの所属を更新します
    //****************************************************
    updateMortonTree(item){
        //モートン木構造の作成
        let mortonInfo = this.convToMortonNumber(item);
        let mortonTreeIdx = mortonInfo ? mortonInfo.mortonNum + ((Math.pow(4, mortonInfo.level)-1.0 ) / 3.0) : 0;
        if( item.regMortonTreeIdx === mortonTreeIdx ) return;

        let node = this._linearQuaternaryTree[mortonTreeIdx];
        let registeredNode = this._linearQuaternaryTree[item.regMortonTreeIdx];

        //既にアイテムが登録されている場合はツリーから削除する
        if( registeredNode && item.id in registeredNode.items ){
            //console.log(`deleteitem id: ${item.id}   morton: ${item.regMortonTreeIdx}`);
            let regNodeItem = registeredNode.items[item.id];
            if( regNodeItem.next === null && regNodeItem.prev === null ){
                registeredNode.headItemID = null;
            }
            if( regNodeItem.prev !== null && registeredNode.items[regNodeItem.prev] ){
                registeredNode.items[regNodeItem.prev].next = regNodeItem.next;
                if( regNodeItem.next === null ) registeredNode.headItemID = regNodeItem.prev;
            }
            if( regNodeItem.next !== null && registeredNode.items[regNodeItem.next] ){ registeredNode.items[regNodeItem.next].prev = regNodeItem.prev; }
            delete registeredNode.items[item.id];
        }

        //アイテムを追加する
        if( (node.headItemID === null) || (typeof node.headItemID === 'undefined') ){
            let setItem = {item: item, prev: null, next: null};
            node['items'] = {};
            node['items'][item.id] = setItem;
            //console.log("--*--");
        }
        else{
            node['items'][node.headItemID].next = item.id;
            node['items'][item.id] = {item: item, prev: node.headItemID, next: null};
        }
        item.regMortonTreeIdx = mortonTreeIdx;
        node['headItemID']  = item.id;

        //console.log(`id: ${item.id}   morton: ${mortonTreeIdx}  color: ${item.color}`);
    }

    //****************************************************
    //  全領域のオブジェクトの衝突判定を実行します
    //  ---
    //  items       ->   アイテムリスト
    //****************************************************
    isColision(items){
        //オブジェクトごとの初期化処理
        items.forEach( item => {
            //あたり判定フラグの初期化
            item.colisionInfoList = [];
            item.isGround = false;
        });

        //木の探索
        //for( let lv = 0; lv <= this._level; lv++ ){
        //    this.mortonCheck(lv, 0);
        //}
        this.mortonCheck(0, 0);
    }

    //****************************************************
    //  モートンツリーをチェックしてあたり判定を行います
    //  ---
    //  level           ->  レベル
    //  mortonNum       ->  領域番号
    //  parentItems     ->  親アイテム
    //****************************************************
    mortonCheck(level, mortonNum, parentItems = []){
        //console.log(`lv: ${level}  num: ${mortonNum}`);

        let idxQuaternaryTree = ((Math.pow(4, level)-1.0 ) / 3.0) + mortonNum;
        let procMortonNode = this._linearQuaternaryTree[idxQuaternaryTree];
        let beforeParentCount = parentItems.length;
        if( !procMortonNode ) return;

        for (let itemID in procMortonNode['items']) {
            let procMortonNodeItem = procMortonNode.items[itemID];

            //同一領域内のあたり判定を実行する
            let currentMortonNodeItem = procMortonNode.items[procMortonNodeItem['next']];
            while(true){
                if( currentMortonNodeItem ){
                    this._isColision(procMortonNodeItem.item, currentMortonNodeItem.item);
                    currentMortonNodeItem = procMortonNode.items[currentMortonNodeItem.next];
                }
                else{
                    break;
                }
            }

            //親ノードのオブジェクトのあたり判定
            for( let n=0; n<parentItems.length; n++ ){
                this._isColision(procMortonNodeItem.item, parentItems[n]);
            }
        }

        //親アイテムリストにアイテムを追加
        for (let itemID in procMortonNode['items']) {
            parentItems.push(procMortonNode.items[itemID].item);
        }

        //下の階層に潜る
        for( let j=0; j<4; j++ ){
            this.mortonCheck(level+1, 4*mortonNum+j, parentItems);
        }

        //親アイテムリストからアイテムを削除する
        parentItems.splice(beforeParentCount, parentItems.length - beforeParentCount);
    }

    //****************************************************
    //  衝突判定を行います
    //  ---
    //  item1       ->  アイテム１
    //  item2       ->  アイテム２
    //****************************************************
    _isColision(item1, item2){
        let r1 = item1.position[0] + item1.width;
        let r2 = item2.position[0] + item2.width;
        let b1 = item1.position[1] + item1.height;
        let b2 = item2.position[1] + item2.height;
        if ( (item1.position[0] <= r2) && (item2.position[0] <= r1) && (item1.position[1] <= b2) && (item2.position[1] <= b1) ) {
            let distX = ( item1.position[0] < item2.position[0] ) ? (item1.position[0] + item1.width - item2.position[0]) : -(item2.position[0] + item2.width - item1.position[0]);
            let distY = ( item1.position[1] < item2.position[1] ) ? (item1.position[1] + item1.height - item2.position[1]) : -(item2.position[1] + item2.height - item1.position[1]);
            let normVec = [distX > 0 ? 1 : -1, distY > 0 ? 1 : -1];          //衝突オブジェクトから見た衝突面の法線ベクトル
            let absdistX = distX < 0 ? -distX : distX;
            let absdistY = distY < 0 ? -distY : distY;
            if( (absdistX > item1.width) || (absdistX > item2.width) ) distX = null;
            if( (absdistY > item1.height) || (absdistY > item2.height) ) distY = null;
            if( !distX || (absdistX > absdistY) ) normVec[0] = 0;
            if( !distY || (absdistX < absdistY) ) normVec[1] = 0;

            let isGroundItem1 = normVec[0] * sharedResource.gravityDirection[0] + normVec[1] * sharedResource.gravityDirection[1] > 0;
            let isGroundItem2 = -normVec[0] * sharedResource.gravityDirection[0] - normVec[1] * sharedResource.gravityDirection[1] > 0;
            item1.isGround |= isGroundItem1;
            item2.isGround |= isGroundItem2;

            if( isGroundItem1 && item1._gravityForce ) {
                item1._gravityForce.vecFace = normVec;
                item1._gravityForce.pair = item2;
            }
            if( isGroundItem2 && item2._gravityForce ) {
                item2._gravityForce.vecFace = [-normVec[0], -normVec[1]];
                item2._gravityForce.pair = item1;
            }

            //衝突側オブジェクトの衝突情報を記録
            item1.colisionInfoList.push( {
                pair: item2,
                distX: distX,
                distY: distY,
                absDistX: absdistX,
                absDistY: absdistY,
                colisionFaceVec: normVec,
            }); 
            //被衝突側オブジェクトの衝突情報を記
            item2.colisionInfoList.push( {
                pair: item1,
                distX: -distX,
                distY: -distY,
                absDistX: absdistX,
                absDistY: absdistY,
                colisionFaceVec: [-normVec[0], -normVec[1]],
            }); 
        }
    }

    //****************************************************
    //  座標を領域番号に変換
    //****************************************************
    convPositionToMortonNumber(position){
        let n = position[0];
        let m = position[1];
        n = (n|(n<<8)) & 16711935;
        n = (n|(n<<4)) & 252645135;
        n = (n|(n<<2)) & 858993459;
        n = (n|(n<<1)) & 1431655765;
        m = (m|(m<<8)) & 16711935;
        m = (m|(m<<4)) & 252645135;
        m = (m|(m<<2)) & 858993459;
        m = (m|(m<<1)) & 1431655765;
        return n | (m << 1);
    }

    //****************************************************
    //  アイテムの所属する領域番号を算出
    //****************************************************
    convToMortonNumber(item){
        let itemPosition = [ [Math.floor((item.position[0]) / this._lowLevelCellSize[0]), Math.floor((item.position[1]) / this._lowLevelCellSize[1])],
                             [Math.floor((item.position[0] + item.width) / this._lowLevelCellSize[0]), Math.floor((item.position[1] + item.height) / this._lowLevelCellSize[1])] ];
        let mortonNum = [this.convPositionToMortonNumber(itemPosition[0]), this.convPositionToMortonNumber(itemPosition[1])];
        let shiftNumber = mortonNum[0] ^ mortonNum[1];
        if( shiftNumber < 0 ) return null;
        let shiftAmont = (shiftNumber === 0) ? 0 : (Math.floor( Math.log(shiftNumber) / Math.log(4) ) + 1) * 2;
        let level = this._level - Math.floor(shiftAmont / 2.0);
        return {mortonNum: (mortonNum[1] >> shiftAmont), level: level};
    }

}
