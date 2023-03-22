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

//var Matter = require('matter-js');
//var engine = Matter.Engine.create();

//cell 1
engine.gravity.y = 0.0

// Create two boxes and a ground
var ball = Matter.Bodies.circle(60, 60, 20);
var boxA = Matter.Bodies.rectangle(90, 90, 30, 30);
var boxB = Matter.Bodies.rectangle(120, 120, 20, 20);
var boxC = Matter.Bodies.rectangle(160, 160, 30, 30);
var ground = Matter.Bodies.rectangle(150, 280, 290, 20, { isStatic: true });

ball.render.fillStyle = 'magenta'
boxA.render.fillStyle = 'purple'
boxB.render.fillStyle = 'aquamarine'
boxC.render.fillStyle = 'yellow'
boxC.render.lineWidth = 3
ground.render.fillStyle = 'cyan'

allBodies = [ball, boxA, boxB, boxC, ground]
//
// Cell contents of notebook end

// add all of the bodies to the world
Matter.World.add(engine.world, allBodies);

// run the renderer
Matter.Render.run(render);
Matter.Runner.run(engine)