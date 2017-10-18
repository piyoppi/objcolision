
export default class frameRateManager{
    constructor(){
        this.startTime = new Date().getTime();
        this._lappedTime = this.startTime;
        this._frameCount = 0;
        this.measuredFramerate = 0;
    }

    completeFrame(){
        this._frameCount++;
        let nowTime = new Date().getTime();
        if( nowTime - this._lappedTime > 1000 ) {
            this.measuredFramerate = this._frameCount;
            this._lappedTime = new Date().getTime();
            this._frameCount = 0;
        }
        return this.measuredFramerate;
    }
}
