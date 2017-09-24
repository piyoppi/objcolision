import display from "./display.js"
import keyboard from "./keyboard.js"
import colisionDetector from "./colisionDetector.js"

let deltaTime = 0.1;
let elements = [
    {
        id: 0,
        position: [100, 220],
        width: 150,
        height: 50,
        force: [0.0, 0.0],
        mass: 1.0,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'black',
        colisionInfo: [],
    },
    {
        id: 1,
        position: [94, 210] ,
        width: 50,
        height: 50,
        force: [0.0, 0.0],
        mass: 1.0,
        velocity: [0.0, 0.0],
        animate: null,
        color: 'red',
        colisionInfo: [],
    }
];

let dispElem = document.getElementById('display');
let disp = new display(dispElem);
let colisionDetect = new colisionDetector(500, 500, 2);

function render(){
    disp.renderElements(elements);
}

function calcVelocity(){
    elements.forEach( item => {
        item.velocity[0] += item.force[0] * deltaTime / item.mass;
        item.velocity[1] += item.force[1] * deltaTime / item.mass;
    });
}

function setPosition(){
    elements.forEach( item => {
        item.position[0] += item.velocity[0] * deltaTime;
        item.position[1] += item.velocity[1] * deltaTime;
    });
}

function freq(){
    colisionDetect.isColision(elements);
    calcVelocity();
    setPosition();
    render();
    console.log(`pos: ${elements[0].position[0]}, ${elements[0].position[1]}   vel: ${elements[0].velocity[0]}, ${elements[0].velocity[1]}`);
    //window.requestAnimationFrame(freq);
}

window.requestAnimationFrame(freq);

//-------------------------------------------

//elements[0].force = [0, 0];
//elements[1].force = [0, 9.8];
