export default class colisionDetector {
    constructor(fieldWidth, fieldHeight, level){
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;
        this._level = level;
        this._linearQuaternaryTree = [];
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
    }

    convPositionToMortonNumber(position){
    }

    convToMortonNumber(item){
        let itemPosition = [ [Math.floor((item.position[0]) / this._lowLevelCellSize[0]), Math.floor((item.position[1]) / this._lowLevelCellSize[1])];
                             [Math.floor((item.position[0] + item.width) / this._lowLevelCellSize[0]), Math.floor((item.position[1] + item.height) / this._lowLevelCellSize[1])] ];
        let mortonNum = [ convPositionToMortonNumber(itemPosition[0], itemPosition[1]) ];

        (mortonNum[0] ^ mortonNum[1])
    }

    registerItem(item){
        
    }
}
