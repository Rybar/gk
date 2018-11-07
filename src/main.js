import gt from "../gametin/index.js";

const { Container, CanvasRenderer, Text, Texture, Sprite, KeyControls }  = gt;
//setup
const w = 640;
const h = 300;
const renderer = new CanvasRenderer(w,h);
document.querySelector(`#game`).appendChild(renderer.view);

//game state
let lastShot = 0;

//game objects
const scene = new Container();

const textures = {
    background: new Texture('../res/img/background2x.png'),
    spaceship: new Texture('../res/img/spaceship.png'),
    bullet: new Texture('../res/img/bullet.png')
}

const controls = new KeyControls();

//make the player spaceship
const ship = new Sprite(textures.spaceship);
ship.pos.x = 120;
ship.pos.y = h/2-16;
ship.update = function (dt, t){
    //update position
    const { pos } = this;
    pos.x += controls.x * dt * 200;
    pos.y += controls.y * dt * 200;

    if(pos.x < 0) pos.x = 0;
    if(pos.x > w) pos.x = w;
    if(pos.y < 0) pos.y = 0;
    if(pos.y > h-32) pos.y = h-32;

    if(controls.action && t - lastShot > 0.15){
        lastShot = t;
        fireBullet(ship.pos.x + 24, ship.pos.y + 14);
    }
}

//bullets
const bullets = new Container();

//add everything to scene container
scene.add(new Sprite(textures.background));
scene.add(ship);
scene.add(bullets);


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

function fireBullet(x,y) {
    const bullet = new Sprite(textures.bullet);
    bullet.pos.x = x;
    bullet.pos.y = y;
    bullet.update = function(dt) {
        this.pos.x += 600 * dt;
        if(bullet.pos.x >= w + 20) {
            bullet.dead = true;
        }
    }
    bullets.add(bullet);
}