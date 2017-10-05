import keyReceiver from "./keyReceiver.js"
import sharedResource from "./sharedResource.js"

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
        this._maxVelocityX = param.maxVelocityX || 0;
        this._maxVelocityY = param.maxVelocityY || 0;

        this._ignoreCountY = 0;
    }

    execute(item){
        let flgAddForce = [false, false];

        this.keyReceiver.reloadKeyInfo();
        if( this.keyReceiver.keyInformation.left.isKeyDown ){
            item.force[0] -= this._addForceX;
            flgAddForce[0] = true;
        }
        else if( this.keyReceiver.keyInformation.right.isKeyDown ){
            item.force[0] += this._addForceX;
            flgAddForce[0] = true;
        }
        if( this.keyReceiver.keyInformation.up.isKeyDown ){
            if( item.isGround && !this._ignoreCountY ){
                item.force[1] -= this._addForceY;
                flgAddForce[1] = true;
                this._ignoreCountY = 10;
            }
            else if(this._ignoreCountY){
                //あたり判定のタイミングによって2回接地判定がされる場合があるので、2回連続で加速しないようにラッチをつけた
                this._ignoreCountY--;
            }
        }


        //最大速度を超える力をかけている場合は力を減らす
        let velocityX = item.velocity[0] + item.force[0] * sharedResource.deltaTime / item.mass;
        let velocityY = item.velocity[1] + item.force[1] * sharedResource.deltaTime / item.mass;

        if( flgAddForce[0] && this._maxVelocityX && Math.abs(velocityX) > this._maxVelocityX ){
            let decForceX = item.mass * (Math.abs(velocityX) - this._maxVelocityX) / sharedResource.deltaTime;
            if( item.force[0] > 0 ) decForceX = -decForceX
            item.force[0] += decForceX;
        }
        if( flgAddForce[1] && this._maxVelocityY && Math.abs(velocityY) > this._maxVelocityY ){
            let decForceY = item.mass * (Math.abs(velocityY) - this._maxVelocityY) / sharedResource.deltaTime;
            if( item.force[1] > 0 ) decForceY = -decForceY
            item.force[1] += decForceY;
        }
    }
}
