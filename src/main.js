import display from "./display.js"
import colisionDetector from "./colisionDetector.js"
import colisionForceController from "./colisionForceControl.js"
import sharedResource from "./sharedResource.js"
import addForceFromKey from "./addForceFromKey.js"

let deltaTime = 0.1;
let elements = [
    {
        id: 0,
        position: [300, 220],
        width: 150,
        height: 50,
        force: [0.0, 0.0],
        mass: 1.0,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'black',
        colisionInfoList: [],
        pin: true,
        proc: [],
    },
    {
        id: 1,
        position: [94, 180] ,
        width: 50,
        height: 50,
        force: [0.0, 0.0],
        mass: 1.0,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'red',
        colisionInfoList: [],
        pin: false,
        proc: [new addForceFromKey()],
    },
    {
        id: 2,
        position: [10, 400],
        width: 350,
        height: 50,
        force: [0.0, 0.0],
        mass: 1.0,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'green',
        colisionInfoList: [],
        pin: true,
        proc: [],
    },
    {
        id: 3,
        position: [94, 100] ,
        width: 50,
        height: 50,
        force: [0.0, 0.0],
        mass: 1.0,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'blue',
        colisionInfoList: [],
        pin: true,
        proc: [],
    },
];

let dispElem = document.getElementById('display');
let disp = new display(dispElem);
let colisionDetect = new colisionDetector(500, 500, 2, elements);
let colisionForce = new colisionForceController(); 

function render(){
    disp.renderElements(elements);
}

function calcVelocity(){
    elements.forEach( item => {
        if( item.pin ){
            item.velocity[0] = 0;
            item.velocity[1] = 0;
        }
        else{
            item.velocity[0] += item.force[0] * deltaTime / item.mass;
            item.velocity[1] += item.force[1] * deltaTime / item.mass;
        }
    });
}

function setPosition(){
    elements.forEach( item => {
        item.position[0] += item.velocity[0] * deltaTime;
        item.position[1] += item.velocity[1] * deltaTime;
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

    elements[1].force = [0, 9.8];
    elements[3].force = [0, 9.8];
}

freq();

//-------------------------------------------

//elements[0].force = [0, 0];
