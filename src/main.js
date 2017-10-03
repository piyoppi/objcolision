import display from "./display.js"
import colisionDetector from "./colisionDetector.js"
import colisionForceController from "./colisionForceControl.js"
import sharedResource from "./sharedResource.js"
import addForceFromKey from "./addForceFromKey.js"
import basicItem from "./basicItem.js"
import linearMove from "./move_controller/linear_move.js"
import circleMove from "./move_controller/circle_move.js"
import gravity from "./gravity.js"

let elements = [
    new basicItem({
        id: 0,
        position: [300, 200],
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
        proc: [new linearMove({force: [80, 0]})],
        materialName: "lift",
    }),
    new basicItem({
        id: 1,
        position: [290, 80] ,
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
        pin: false,
        proc: [],
    }),
    new basicItem({
        id: 5,
        position: [600, 600],
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
        proc: [new circleMove()],
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

function calcVelocity(){
    let _FRIC_IGNORE_DIRECTION = 0.1;
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
    gravity.add(elements); 
    //console.log(`pos: ${elements[0].position[0]}, ${elements[0].position[1]}   vel: ${elements[0].velocity[0]}, ${elements[0].velocity[1]}`);
    //window.requestAnimationFrame(freq);
    setTimeout( freq, 16 );
}

freq();
