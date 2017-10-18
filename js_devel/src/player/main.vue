<style scoped>
.map-area {
    width: 100%;
    height: 100%;
}
</style>

<template>
    <div>
        <div id="map" class="map-area"></div>
    </div>
</template>

<script>

import colisionDetector from "./../core/colisionDetector.js"
import colisionForceController from "./../core/colisionForceControl.js"
import sharedResource from "./../core/sharedResource.js"
import addForceFromKey from "./../core/addForceFromKey.js"
import basicItem from "./../core/basicItem.js"
import linearMove from "./../core/move_controller/linear_move.js"
import circleMove from "./../core/move_controller/circle_move.js"
import gravity from "./../core/gravity.js"
import objectManager from "./../core/objectManager.js"

//renderer
import display from "./../core/display.js"
import rendererPixi from "./../core/renderer/pixi/renderer.js"
import textureListPixi from "./../core/renderer/pixi/textureList.js"
import animationPixi from "./../core/renderer/pixi/animation.js"

let elements = [
new basicItem({
    id: 0,
    position: [300, 230],
    width: 150,
    height: 50,
    mass: 1.0,
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
    mass: 1.0,
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
    mass: 1.0,
    color: 'blue',
    pin: true,
    proc: [],
}),
new basicItem({
    id: 5,
    position: [700, 600],
    width: 150,
    height: 50,
    mass: 1.0,
    color: 'black',
    pin: false,
    disableGravity: true,
    disableExternalForce: true,
    proc: [new circleMove({angularVelocity: 0.51})],
    materialName: "lift",
}),
];

window.onload = function(){

    let dispElem = document.getElementById('display');
    let colisionDetect = new colisionDetector(1500, 1500, 2, elements);
    let colisionForce = new colisionForceController(); 

    let renderer = new rendererPixi(dispElem);
    let textureList = new textureListPixi();
    textureList.loadTextureFromURLs( [
    {name: "chip", url:  'tmpimg/chip.bmp'},
    {name: "chara", url: 'tmpimg/chara.png'}
    ], ()=>{
        renderer.addItem(elements[0], new animationPixi({texture: textureList.textures["chip"], frame: [{nextStep: 10, rect: {x: 0, y: 0, width: 64, height: 64} }]}) );
        renderer.addItem(elements[1], new animationPixi({texture: textureList.textures["chip"], frame: [
            {nextStep: 10, rect: {x: 0, y: 0, width: 64, height: 64}},
            {nextStep: 10, rect: {x: 32, y: 0, width: 64, height: 64}},
            {nextStep: 10, rect: {x: 64, y: 0, width: 64, height: 64}}
        ]}));
        renderer.addItem(elements[2], new animationPixi({texture: textureList.textures["chip"], frame: [{nextStep: 10, rect: {x: 32, y: 0, width: 32, height: 32} }], option: {tiling: true}}) );
        renderer.addItem(elements[3], new animationPixi({texture: textureList.textures["chip"], frame: [{nextStep: 10, rect: {x: 0, y: 0, width: 64, height: 64} }]}) );
        renderer.addItem(elements[4], new animationPixi({texture: textureList.textures["chip"], frame: [{nextStep: 10, rect: {x: 0, y: 0, width: 64, height: 64} }]}) );
        renderer.addItem(elements[5], new animationPixi({texture: textureList.textures["chip"], frame: [{nextStep: 10, rect: {x: 0, y: 0, width: 64, height: 64} }]}) );
    });

    //----------------
    //let disp = new display(dispElem);
    function render(){
        renderer.render(elements);
        //disp.renderElements(elements);
    }
    //----------------

    function freq(){
        proc();
        gravity.add(elements); 
        colisionDetect.isColision(elements);
        colisionForce.changeForce(elements);
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
    freq();


    function proc(){
        elements.forEach( item => {
            item.proc.forEach( proc => {
                proc.execute(item);
            });
        });
    }

}

export default {
    data: function () {
        return {
        }
    },
    components: {
    },
    created: function(){
    },
    methods: {
    }
}

</script>
