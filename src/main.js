import gt from "../gametin/index.js";
import Squizz from "./entities/Squizz.js";
import Level from "./Level.js";

const { Container, Texture, Sprite, math, Game, MouseControls, KeyControls, entity}  = gt;

//setup
const game = new Game(640, 360, '#game');
const {scene, w, h} = game;
const dirtTiles = new Texture("./res/img/dirtTiles.png");
const controls = new KeyControls();
const squizz = new Squizz(controls);
const level = new Level(w,h);
scene.add(level);
scene.add(squizz);

game.run((dt, t) => {
    const { pos } = squizz;
    const { bounds: {top,bottom, left, right} } = level; 
    pos.x = math.clamp(pos.x, left, right);
    pos.y = math.clamp(pos.y, top, bottom);
    const ground = level.checkGround(entity.center(squizz));
});