var canvas = document.getElementById('canvas');
var bw = window.innerWidth
var bh = window.innerHeight

canvas.width = bw;
canvas.height = bh;

var engine = Matter.Engine.create();
var render = Matter.Render.create({
    element: document.body,
    engine: engine,
    canvas: canvas,
    options: {
        width: bw,
        height: bh,
        wireframes: false,
        background: '#eeeeee',
        // showPositions: true,
        // showDebug: true,
        // showMousePosition: true
    }
});

// Cell contents of notebook start
//

//cell 1
//var Matter = require('matter-js');
//var engine = Matter.Engine.create();
var allBodies = [];
engine.gravity.y = 0.0

var rng = [...Array(10).keys()];

for (var i of rng) {
    let position_x = 50+i*20;
    let position_y = 40;
    let box = Matter.Bodies.rectangle(position_x, position_y, 10, 10);
    
    box.render.fillStyle = 'blue';
    allBodies.push(box);
}
//
// Cell contents of notebook end

// add all of the bodies to the world
Matter.World.add(engine.world, allBodies);

// run the renderer
Matter.Render.run(render);
Matter.Runner.run(engine)