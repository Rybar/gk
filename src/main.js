import gt from "../gametin/index.js";
const { Container, CanvasRenderer, Text }  = gt;
//setup
const w = 640;
const h = 480;
const renderer = new CanvasRenderer(w,h);
document.querySelector(`#game`).appendChild(renderer.view);

//game objects
const scene = new Container();
const message = new Text("The Renderer!",
    {   font: '40pt sans-serif',
        fill: 'DarkRed',
        align: 'center'
    });
message.pos.x = w/2;
message.pos.y = h/2;
message.update = function (dt) {
    this.pos.x -= 100 * dt;
    if(this.pos.x < -420) {
        this.pos.x = w;
    }
}
scene.add(message);


//game loop
let dt = 0;
let last = 0;
function loop (ms) {
    requestAnimationFrame(loop);
    const t = ms / 1000;
    dt = t - last;
    last = t;
    scene.update(dt, t);
    renderer.render(scene);
}
requestAnimationFrame(loop);