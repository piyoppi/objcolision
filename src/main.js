import display from "./display.js"
import keyboard from "./keyboard.js"

let deltaTime = 0.1;
let elements = [
    {id: 0, x: 100, y:200, width: 150, height: 50, force: [0.0, 0.0], mass: 1.0, velocity: [0.0, 0.0], animate: null, color: 'black' },
    {id: 1, x: 100, y:50, width: 50, height: 50, force: [0.0, 0.0], mass: 1.0, velocity: [0.0, 0.0], animate: null, color: 'red' }
];

let disp = new display(document.getElementById('display'));

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
        item.x += item.velocity[0] * deltaTime;
        item.y += item.velocity[1] * deltaTime;
    });
}

function freq(){
    calcVelocity();
    setPosition();
    render();
    window.requestAnimationFrame(freq);
    console.log(`pos: ${elements[0].x}, ${elements[0].y}   vel: ${elements[0].velocity[0]}, ${elements[0].velocity[1]}`);
elements[0].force = [0, 0];
}

window.requestAnimationFrame(freq);

//-------------------------------------------

elements[0].force = [50, 0];
