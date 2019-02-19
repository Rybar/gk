import gt from "../../gametin/index.js";
const { Container, Camera, entity, math } = gt;

import Squizz from "../entities/Squizz.js";
import Baddie from "../entities/Baddie.js";
import Level from "../Level.js";

class GameScreen extends Container {
  constructor(game, controls, onGameOver) {
    super();

    this.onGameOver = onGameOver;
    const level = new Level(game.w * 2, game.h * 2);
    const squizz = new Squizz(controls);
    squizz.pos = {
      x: 16 * Math.round(level.w/16/2),
      y: 16 * Math.round(level.h/16/2)
    };

    const camera = this.add(
      new Camera(
        squizz,
        { w: game.w, h: game.h },
        { w: level.w, h: level.h }, 0.1
      )
    );

    this.stats = {
      pellets: 0,
      maxPellets: level.totalFreeSots,
      lives: 3,
      score: 0
    }

    // Add roaming baddies
    this.baddies = this.addBaddies(level);

    // Add it all to the game camera
    camera.add(level);
    //camera.add(this.baddies);
    camera.add(squizz);

    // Keep references to things we need in "update"
    this.level = level;
    this.camera = camera;
    this.squizz = squizz;
  }

  addBaddies(level) {
    const baddies = new Container();
    // Horizontal baddies
    for (let i = 0; i < 5; i++) {
      const b = baddies.add(new Baddie(200, 0));
      b.pos.y = ((level.h / 5) | 0) * i + level.tileH * 2;
    }
    // Vertical baddies
    for (let i = 0; i < 10; i++) {
      const b = baddies.add(new Baddie(0, 200));
      b.pos.x = ((level.w / 10) | 0) * i + level.tileW;
    }
    return baddies;
  }

  update(dt, t) {
    super.update(dt, t);
    const { squizz, level } = this;
    // Confine player to the level bounds
    const { pos } = squizz;
    const { bounds: { top, bottom, left, right } } = level;
    pos.x = math.clamp(pos.x, left, right);
    pos.y = math.clamp(pos.y, top, bottom);

    // See if we're on new ground
    const ground = level.checkGround(entity.center(squizz));
    if (ground === "cleared") {
      //squizz.dead = true;
      //console.log('squizz')
      //this.onGameOver(this.stats);
    }
  }
}

export default GameScreen;
