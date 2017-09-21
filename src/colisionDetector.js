export default class colisionDetector {
    constructor(fieldWidth, fieldHeight, level){
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;
        this._level = level;
        this._linearQuaternaryTree = [];
        this._makeLinearQuaternaryTree();
    }

    _makeLinearQuaternaryTree(){
        let cycle = ( Math.pow(4, this._level)-1.0 ) / 3.0;
        for( let i=0; i<cycle; i++ ){
            this._linearQuaternaryTree.push([]);
        }
        let lowLevelCellCount = Math.pow( 2, this._level );
        this._lowLevelCellSize = [ this._fieldWidth / lowLevelCellCount, this._fieldHeight / lowLevelCellCount ];
        this._bitLength = 2 * this._level;
    }

    isColision(item){
        let itemMortonInfo = this.convToMortonNumber(item);
        console.log(`mortonNum: ${itemMortonInfo.mortonNum}   level: ${itemMortonInfo.level}` );

        //４分木をたどる
        //for( let level = itemMortonInfo.level; level <= this._level; level++ ){
        //}
    }

    _isColision(item1, item2){

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
        console.log(`mortonCalc: ${n | (m << 1)}`);
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
        return {mortonNum: (mortonNum[1] >> shiftAmont) + levelOffset, level: level};
    }

    registerItem(item){
        
    }
}
