import gt from "../gametin/index.js";

const { Container, CanvasRenderer, Text, Texture, Sprite, KeyControls }  = gt;
//setup
const w = 640;
const h = 300;
const renderer = new CanvasRenderer(w,h);
document.querySelector(`#game`).appendChild(renderer.view);

//game state
let lastShot = 0;
let lastSpawn = 0;
let spawnSpeed = 1.0;
let scoreAmount = 0;
let gameOver = false;

//game objects
const scene = new Container();

const textures = {
    background: new Texture('../res/img/background2x.png'),
    spaceship: new Texture('../res/img/spaceship.png'),
    bullet: new Texture('../res/img/bullet.png'),
    baddie: new Texture('../res/img/baddie.png')
}

const controls = new KeyControls();

const score = new Text("score:", {
    font: "20px sans-serif",
    fill: "#DDD",
    align: "center"
});
score.pos.x = w/2;
score.pos.y = h-30;

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

    if(!gameOver && controls.action && t - lastShot > 0.15){
        lastShot = t;
        fireBullet(ship.pos.x + 24, ship.pos.y + 14);
    }
}

//bullets
const bullets = new Container();

//baddies
const baddies = new Container();
function spawnBaddie(x,y, speed){
    const baddie = new Sprite(textures.baddie);
    baddie.pos.x = x;
    baddie.pos.y = y;
    baddie.update = function(dt) {
        this.pos.x += speed * dt;
    }
    baddies.add(baddie);
}


//add everything to scene container
scene.add(new Sprite(textures.background));
scene.add(ship);
scene.add(bullets);
scene.add(baddies);
scene.add(score);


//game loop
let dt = 0;
let last = 0;
function loop (ms) {
    requestAnimationFrame(loop);
    const t = ms / 1000;
    dt = t - last;
    last = t;
    if(t-lastSpawn > spawnSpeed){
        lastSpawn = t;
        const speed = -50 - (Math.random() * Math.random() * 100);
        const position = 24 + Math.random() * h - 48;
        spawnBaddie(w, position, speed);

        //accellerating spawn speed
        spawnSpeed = spawnSpeed > 0.05 ?  0.6 : spawnSpeed * 0.97 + .001;
    }
    baddies.children.forEach(baddie => {
        if(baddie.pos.x < -32) {
            if(!gameOver){
                doGameOver();
            }
            baddie.dead = true;
        }
        bullets.children.forEach(bullet => {
            const dx = baddie.pos.x + 16 - (bullet.pos.x+8);
            const dy = baddie.pos.y + 16 - (bullet.pos.y+8);
            if(Math.hypot(dx,dy) < 24){
                baddie.dead = true;
                bullet.dead = true;
                scoreAmount += Math.floor(t);
            }
        });
    });
    
    score.text = `Score: ${scoreAmount}`; 
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

function doGameOver() {
    const gameOverMessage = new Text("Game Over", {
        font: '30pt sans-serif',
        fill: "#ff8888",
        align: "center"
    });
    gameOverMessage.pos.x = w/2;
    gameOverMessage.pos.y = 120;
    scene.add(gameOverMessage);
    scene.remove(ship);
    gameOver = true;
}