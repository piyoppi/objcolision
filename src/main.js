import display from "./display.js"
import keyboard from "./keyboard.js"

let elements = [
    {id: 0, x: 100, y:200, width: 150, height: 50, force: [], velocity: [], animate: null, color: 'black' },
    {id: 1, x: 100, y:50, width: 50, height: 50, force: [], velocity: [], animate: null, color: 'red' }
];

let disp = new display(document.getElementById('display'));

function render(){
    disp.renderElements(elements);
    console.log(`renderer`);
    window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);
