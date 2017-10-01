import display from "./display.js"
import colisionDetector from "./colisionDetector.js"
import colisionForceController from "./colisionForceControl.js"
import sharedResource from "./sharedResource.js"
import addForceFromKey from "./addForceFromKey.js"
import basicItem from "./basicItem.js"

let elements = [
    new basicItem({
        id: 0,
        position: [300, 220],
        width: 150,
        height: 50,
        force: [0.0, 0.0],
        mass: 1.0,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'black',
        pin: true,
    }),
    new basicItem({
        id: 1,
        position: [194, 180] ,
        width: 50,
        height: 50,
        force: [0.0, 0.0],
        mass: 1.0,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'red',
        pin: false,
        proc: [new addForceFromKey()],
    }),
    new basicItem({
        id: 2,
        position: [10, 400],
        width: 350,
        height: 50,
        force: [0.0, 0.0],
        mass: 100.0,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'green',
        pin: true,
    }),
    new basicItem({
        id: 3,
        position: [194, 100] ,
        width: 50,
        height: 50,
        force: [0.0, 0.0],
        mass: 1,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'blue',
        pin: false,
        proc: [],
    }),
    new basicItem({
        id: 4,
        position: [194, 10] ,
        width: 50,
        height: 50,
        force: [0.0, 0.0],
        mass: 1.0,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'blue',
        pin: true,
        proc: [],
    }),
];

let dispElem = document.getElementById('display');
let disp = new display(dispElem);
let colisionDetect = new colisionDetector(500, 500, 2, elements);
let colisionForce = new colisionForceController(); 

function render(){
    disp.renderElements(elements);
}

function calcVelocity(){
    console.log('-----');
    elements.forEach( item => {
        console.log(`${item.id}  | ${item.force[0]}, ${item.force[1]}`);
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
        }
        item.force[0] = 0;
        item.force[1] = 0;
        item.forceList = [];
    });
}

function setPosition(){
    elements.forEach( item => {
        item.position[0] += item.velocity[0] * sharedResource.deltaTime;
        item.position[1] += item.velocity[1] * sharedResource.deltaTime;
        if( (item.velocity[0] != 0) || (item.velocity[1] != 0 ) ) colisionDetect.updateMortonTree(item);
    });
}

function proc(){
    elements.forEach( item => {
        item.proc.forEach( proc => {
            proc.execute(item);
        });
    });
}

function freq(){
    proc();
    colisionDetect.isColision(elements);
    colisionForce.changeForce(elements);
    calcVelocity();
    setPosition();
    render();
    //console.log(`pos: ${elements[0].position[0]}, ${elements[0].position[1]}   vel: ${elements[0].velocity[0]}, ${elements[0].velocity[1]}`);
    //window.requestAnimationFrame(freq);
    setTimeout( freq, 10 );

    elements[1].addForce([0, 9.8 * elements[1].mass], null);
    elements[3].addForce([0, 9.9 * elements[3].mass], null);
    elements[4].addForce([0, 9.8 * elements[4].mass], null);
}

freq();

//-------------------------------------------

//elements[0].force = [0, 0];
