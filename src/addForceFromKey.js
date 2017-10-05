import keyReceiver from "./keyReceiver.js"

export default class addForceFromKey{
    constructor(param){
        let keyInfos = [
            { name: 'left',  description: '', keyCode: '37' },
            { name: 'right', description: '', keyCode: '39' },
            { name: 'up', description: '', keyCode: '90' },
        ];

        this.keyReceiver = new keyReceiver(keyInfos);
        this._addForceX = param.forceX || 0;
        this._addForceY = param.forceY || 0;
    }

    execute(item){
        this.keyReceiver.reloadKeyInfo();
        if( this.keyReceiver.keyInformation.left.isKeyDown ){
            item.force[0] -= this._addForceX;
        }
        else if( this.keyReceiver.keyInformation.right.isKeyDown ){
            item.force[0] += this._addForceX;
        }
        else if( this.keyReceiver.keyInformation.up.isKeyDown ){
            item.force[1] -= this._addForceY;
        }
    }
}
