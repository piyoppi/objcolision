import display from "./display.js"
import colisionDetector from "./colisionDetector.js"
import colisionForceController from "./colisionForceControl.js"
import sharedResource from "./sharedResource.js"
import addForceFromKey from "./addForceFromKey.js"
import basicItem from "./basicItem.js"
import linearMove from "./move_controller/linear_move.js"
import circleMove from "./move_controller/circle_move.js"
import gravity from "./gravity.js"
import objectManager from "./objectManager.js"

let elements = [
    new basicItem({
        id: 0,
        position: [300, 230],
        width: 150,
        height: 50,
        force: [0.0, 0.0],
        mass: 1.0,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'black',
        pin: true,
        disableGravity: true,
        disableExternalForce: true,
        proc: [new linearMove({force: [80, 0]})],
        materialName: "lift",
    }),
    new basicItem({
        id: 1,
        position: [190, 250],
        width: 50,
        height: 50,
        force: [0.0, 0.0],
        mass: 1.0,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'red',
        pin: false,
        proc: [new addForceFromKey({forceX: 301, forceY: 40000, maxVelocityX: 150, maxVelocityY: 1000})],
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
        position: [194, 170] ,
        width: 50,
        height: 50,
        force: [0.0, 0.0],
        mass: 1,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'orange',
        pin: true,
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
    new basicItem({
        id: 5,
        position: [700, 600],
        width: 150,
        height: 50,
        force: [0.0, 0.0],
        mass: 1.0,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'black',
        pin: false,
        disableGravity: true,
        disableExternalForce: true,
        proc: [new circleMove({angularVelocity: 0.51})],
        materialName: "lift",
    }),
];

let dispElem = document.getElementById('display');
let disp = new display(dispElem);
let colisionDetect = new colisionDetector(1500, 1500, 2, elements);
let colisionForce = new colisionForceController(); 

function render(){
    disp.renderElements(elements);
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
    gravity.add(elements); 
    colisionDetect.isColision(elements);
    colisionForce.changeForce(elements);
    //calcVelocity();
    ///objectManager.setPosition(elements);
    objectManager.updateObjectState(elements);

    elements.forEach( item => {
        if( (item.velocity[0] != 0) || (item.velocity[1] != 0 ) ) colisionDetect.updateMortonTree(item);
    })
    render();
    let frameRate = sharedResource.frameRateManager.completeFrame();
    //console.log(frameRate);
    //console.log(`pos: ${elements[0].position[0]}, ${elements[0].position[1]}   vel: ${elements[0].velocity[0]}, ${elements[0].velocity[1]}`);
    //window.requestAnimationFrame(freq);
    setTimeout( freq, 16 );
}
//elements[1].force=[10000, 0];
freq();
