export default class basicItem{
    
    constructor(param){
        this.id = param.id || 0;
        this.position = param.position || [0, 0];
        this.width = param.width || 50;
        this.height = param.height || 50;
        this.force = param.force || [0.0, 0.0];
        this.forceList = [];
        this.mass = param.mass || 1.0;
        this.velocity = param.velocity || [0.0, 0.0];
        this.animate = null;
        this.color = param.color || 'black';
        this.colisionInfoList = [];
        this.pin = param.pin || false;
        this.disableGravity = param.disableGravity || false;
        this.disableExternalForce = param.disableExternalForce || false;
        this.proc = param.proc || [];
        this.materialName = param.materialName || 'default';

        //摩擦関連
        this.cntRestingStateCausedFriction = 0;
        this.isEfficientFriction = false;

        //最小力
        this.minForce = 0.0001
    }

    addForce(vecForce, vecFace = null, pair = null, option = {}){
        if( !option.forceAdd && this.disableExternalForce ) return;

        let veclen = vecForce[0] * vecForce[0] + vecForce[1] * vecForce[1];
        if( veclen > this.minForce ) {
            this.force[0] += vecForce[0];
            this.force[1] += vecForce[1];
            this.forceList.push( { addX: vecForce[0], addY: vecForce[1], vecFace: vecFace, pair: pair} );
        }
    }

    setForce(vecForce, option={}){
        if( !option.forceAdd && this.disableExternalForce ) return;
        this.force[0] = vecForce[0];
        this.force[1] = vecForce[1];
    }

}
