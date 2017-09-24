export default class colisionDetector {
    constructor(fieldWidth, fieldHeight, level){
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;
        this._level = level;
        this._linearQuaternaryTree = [];
        this._makeLinearQuaternaryTree();
    }

    _makeLinearQuaternaryTree(){
        let cycle = ( Math.pow(4, this._level+1)-1.0 ) / 3.0;
        for( let i=0; i<cycle; i++ ){
            this._linearQuaternaryTree.push([]);
        }
        //最も小さい領域のカウント
        let lowLevelCellCount = Math.pow( 2, this._level );
        //最も小さい分割領域の大きさを計算
        this._lowLevelCellSize = [ this._fieldWidth / lowLevelCellCount, this._fieldHeight / lowLevelCellCount ];
        console.log(`cellCount: ${cycle}, cellSize: ${cycle}`);
    }

    //****************************************************
    //  全領域のオブジェクトの衝突判定を実行します
    //****************************************************
    isColision(items){
        items.forEach( item => {
            let mortonInfo = this.convToMortonNumber(item)
            let levelOffset = ( Math.pow(4, mortonInfo.level)-1.0 ) / 3.0;
            this._linearQuaternaryTree[mortonInfo.mortonNum + levelOffset].push(item);
            console.log(`id: ${item.id}  |  mortonNumber: ${mortonInfo.mortonNum}, level: ${mortonInfo.level}`);
        });

        for( let lv = 0; lv <= this._level; lv++ ){
            this.mortonCheck(lv, 0);
        }
    }

    //****************************************************
    //  モートンツリーをチェックしてあたり判定を行います
    //  ---
    //  level           ->  レベル
    //  mortonNum       ->  領域番号
    //  parentItems     ->  親アイテム
    //****************************************************
    mortonCheck(level, mortonNum, parentItems = []){
        let idxQuaternaryTree = ((Math.pow(4, level)-1.0 ) / 3.0) + mortonNum;
        let procMortonNode = this._linearQuaternaryTree[idxQuaternaryTree];
        if( !procMortonNode ) return;

        for( let i=0; i<procMortonNode.length; i++ ){
            //同一領域内のあたり判定を実行する
            for( let n=i+1; n<procMortonNode; n++ ){
                this._isColision(procMortonNode[i], procMortonNode[n]);
            }
            //親ノードのオブジェクトのあたり判定
            for( let n=0; n<parentItems.length; n++ ){
                this._isColision(procMortonNode[i], parentItems[n]);
            }
            //親アイテムリストにアイテムを追加
            parentItems.push(procMortonNode[i]);
        }

        //下の階層に潜る
        for( let j=0; j<4; j++ ){
            this.mortonCheck(level+1, 4*mortonNum+j, parentItems);
        }
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
        if (item1.position[0] <= r2 && item2.position[0] <= r1 && item2.position[1] <= b2 && item2.position[1] <= b1) {
            let distX = ( item1.position[0] < item2.position[0] ) ? (item1.position[0] + item1.width - item2.position[0]) : -(item2.position[0] + item2.width - item1.position[0]);
            let distY = ( item1.position[1] < item2.position[1] ) ? (item1.position[1] + item1.height - item2.position[1]) : -(item2.position[1] + item2.height - item1.position[1]);
            let absdistX = distX < 0 ? -distX : distX;
            let absdistY = distY < 0 ? -distY : distY;
            if( (absdistX > item1.width) || (absdistX > item2.width) ) distX = null;
            if( (absdistY > item1.height) || (absdistY > item2.height) ) distY = null;
            console.log(`hit: idx: ${item1.id}   distX: ${distX}   distY: ${distY}`);
            item1.colisionInfo.push( {
                pair: item2,
                distX: distX,
                distY: distY,
            }); 
            item2.colisionInfo.push( {
                pair: item1,
                distX: -distX,
                distY: -distY,
            }); 
        }
    }

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

    convToMortonNumber(item){
        let itemPosition = [ [Math.floor((item.position[0]) / this._lowLevelCellSize[0]), Math.floor((item.position[1]) / this._lowLevelCellSize[1])],
                             [Math.floor((item.position[0] + item.width) / this._lowLevelCellSize[0]), Math.floor((item.position[1] + item.height) / this._lowLevelCellSize[1])] ];
        let mortonNum = [this.convPositionToMortonNumber(itemPosition[0]), this.convPositionToMortonNumber(itemPosition[1])];
        let shiftNumber = mortonNum[0] ^ mortonNum[1];
        let shiftAmont = (shiftNumber === 0) ? 0 : Math.floor(Math.log2(shiftNumber))+1;
        let level = this._level - Math.floor(shiftAmont / 2.0);
        let levelOffset = ( Math.pow(4, level)-1.0 ) / 3.0;
        return {mortonNum: (mortonNum[1] >> shiftAmont), level: level};
    }

    registerItem(item){
        
    }

}
