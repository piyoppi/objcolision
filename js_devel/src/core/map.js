import objectManager from "./../core/objectManager.js"
import gravity from "./../core/gravity.js"
import colisionDetector from "./../core/colisionDetector.js"
import colisionForceController from "./../core/colisionForceControl.js"

export default class map {
    constructor(param) {
        this.width = param.width || 500;
        this.height = param.width || 500;
        this.objects = [];

        this._colisionDetect = new colisionDetector(1500, 1500, 2);
        this._colisionForce = new colisionForceController(); 
    }

    setObjects(arrObjects) {
        this.objects = arrObjects;
        this.objects.forEach( item => {
            this._colisionDetect.updateMortonTree(item);
        });
    }

    executeStep() {
        objectManager.runObjectTasks(this.objects);
        gravity.add(this.objects); 
        this._colisionDetect.isColision(this.objects);
        this._colisionForce.changeForce(this.objects);
        objectManager.updateObjectState(this.objects);

        this.objects.forEach( item => {
            if( (item.velocity[0] != 0) || (item.velocity[1] != 0 ) ) this._colisionDetect.updateMortonTree(item);
        })
    }

    _runObjectTasks(){
    }

    toJSON() {
        return JSON.stringify( {
            objects: this.objects
        });
    }
}
