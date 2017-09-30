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
        this.proc = param.proc || [];
    }

    addForce(vecForce, vecFace){
        this.force[0] += vecForce[0];
        this.force[1] += vecForce[1];
        this.forceList.push( { addX: vecForce[0], addY: vecForce[1], face: vecFace} );
    }

}
