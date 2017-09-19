import display from "./display.js"

let elements = [
    {id: 0, x: 100, y:200, width: 150, height: 50, force: [], velocity: [], animate: null, color: 'black' },
    {id: 1, x: 100, y:50, width: 50, height: 50, force: [], velocity: [], animate: null, color: 'red' }
];

let disp = new display(document.getElementById('display'));
disp.renderElements(elements);


