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
//cellcontents
//
// Cell contents of notebook end

// add all of the bodies to the world
Matter.World.add(engine.world, allBodies);

// run the renderer
Matter.Render.run(render);
Matter.Runner.run(engine)