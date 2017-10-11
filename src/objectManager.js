
export default class objectManager {
    constructor(){
        this.objects = [];
    }

    _calcVelocity(){
        let _FRIC_IGNORE_DIRECTION = 0.1;
        //console.log('-----');
        this.objects.forEach( item => {
            //console.log(`${item.id}  | ${item.force[0]}, ${item.force[1]}`);
            //console.log( item.forceList );
            if( item.pin ){
                item.velocity[0] = 0;
                item.velocity[1] = 0;
                item.absVelocity = 0;
            }
            else{
                item.velocity[0] += item.force[0] * sharedResource.deltaTime / item.mass;
                item.velocity[1] += item.force[1] * sharedResource.deltaTime / item.mass;
                item.absVelocity = Math.sqrt(item.velocity[0] * item.velocity[0] + item.velocity[1] * item.velocity[1]);
                //[TODO]摩擦がかかっている状態で静止状態が続いているとみなせる場合は速度を０にする処理を追加してみる
                if( ((item.velocity[0] * item.velocity[0] + item.velocity[1] * item.velocity[1]) < _FRIC_IGNORE_DIRECTION) && item.isEfficientFriction ){
                    if( item.cntRestingStateCausedFriction > 5 ){
                        item.velocity[0] = 0;
                        item.velocity[1] = 0;
                        item.cntRestingStateCausedFriction = 0;
                    }
                    else{
                        item.cntRestingStateCausedFriction++;
                    }
                }
            }
            item.force[0] = 0;
            item.force[1] = 0;
            item.forceList = [];
        });
    }

    _setPosition(){
        this.objects.forEach( item => {
            item.position[0] += 0.5 * (item.velocity[0] + item.beforeVelocity[0]) * sharedResource.deltaTime;
            item.position[1] += 0.5 * (item.velocity[1] + item.beforeVelocity[1]) * sharedResource.deltaTime;
            if( (item.velocity[0] != 0) || (item.velocity[1] != 0 ) ) colisionDetect.updateMortonTree(item);
            item.beforeVelocity[0] = item.velocity[0];
            item.beforeVelocity[1] = item.velocity[1];
        });
    }

    addObjects(items){
        this.objects.push(...items);
    }

    updateObjectState(){
        this._calcVelocity();
        this._setPosition();
    }

}
