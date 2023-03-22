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
        wireframe: false
    }
});

var runner = Matter.Runner.create();
// engine.world.gravity.y = 0;


// create two boxes and a ground
var ball = Matter.Bodies.circle(420, 15, 20);
var boxA = Matter.Bodies.rectangle(400, 200, 80, 80, {fillStyle: 'red'});
var boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
var ground = Matter.Bodies.rectangle(400, 200, 60, 60, { isStatic: true });

// add all of the bodies to the world
Matter.World.add(engine.world, [ball, boxA, boxB, ground]);

// run the renderer
Matter.Render.run(render);
Matter.Runner.run(engine)