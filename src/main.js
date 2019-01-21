import gt from "../gametin/index.js";
import Squizz from "./entities/Squizz.js";
import Level from "./Level.js";
import Camera from "../gametin/Camera.js";
import Baddie from "./entities/Baddie.js";

const { Container, Texture, Sprite, math, Game, KeyControls, entity}  = gt;

//setup
const game = new Game(640, 360, '#game');
const {scene, w, h} = game;
const dirtTiles = new Texture("./res/img/dirtTiles.png");
const controls = new KeyControls();
const squizz = new Squizz(controls);
const level = new Level(w*2,h*2);

const camera = new Camera(
    squizz,
    {w,h},
    {w: level.w, h: level.h}
);

scene.add(camera);
camera.add(level);
camera.add(squizz);

const baddies = addBaddies(level);
camera.add(baddies);

function addBaddies(level) {
    const baddies = new Container();
    //horizontal
    for(let i = 1; i < 5; i++){
        const b = baddies.add(new Baddie(32 * 5, 0));
        b.pos.y = Math.floor(level.h / 5) * i + level.tileH * 2;
    }
    //vertical
    for(let i = 1; i < 10; i++){
        const b = baddies.add(new Baddie(0, 32 * 5));
        b.pos.x = Math.floor(level.w / 10) * i + level.tileW;
    }
    return baddies;
}

game.run((dt, t) => {
    const { pos } = squizz;
    const { bounds: {top,bottom, left, right} } = level; 
    pos.x = math.clamp(pos.x, left, right);
    pos.y = math.clamp(pos.y, top, bottom);
    const ground = level.checkGround(entity.center(squizz));
    if(ground === "cleared"){
        squizz.dead = true;
    }
    baddies.map(b => {
        const { pos } = b;
        if(entity.distance(squizz, b) < 32) {
            squizz.dead = true;
            // send offscreen 
            if(b.xSpeed) pos.x = -level.w;
            else pos.y = -level.h;
        }
        //screen wrap
        if(pos.x > level.w) pos.x = -32;
        if(pos.y > level.h) pos.y = -32;
        
    })
});

