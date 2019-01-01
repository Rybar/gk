import gt from "../gametin/index.js";
import Squizz from "./entities/Squizz.js";

const { Container, CanvasRenderer, Text, Texture, Sprite, KeyControls, math, TileSprite, Game, MouseControls }  = gt;

//setup
const game = new Game(640, 300, '#game');
const {scene, w, h} = game;
const mouse = new MouseControls(game.renderer.view);

const balls = scene.add(new Container());
for(let i = 0; i < 100; i++){
    const squizz = balls.add(new Squizz());
    squizz.pos.x = math.rndInt(w);
    squizz.pos.y = math.rndInt(h);
}

game.run((dt, t) => {
    const {pressed, pos} = mouse;
    
    balls.map(b => {
        if(b.pos.x > w) {
            b.pos.x = -32;
            b.speed *= 1.1;
        }
        if(pressed && math.distance(pos, b.pos) <= 16) {
            if(b.speed > 0) {
                b.speed = 0;
            } else {
                b.dead = true;
            }
        }
    })
    if(pressed){
        console.log(pos);
    }
    mouse.update();
});