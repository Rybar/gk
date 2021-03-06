import Container from "./Container.js";
import CanvasRenderer from "./renderer/CanvasRenderer.js";

const STEP = 1/60;
const MAX_FRAME = STEP * 5; 

class Game {
    constructor (w,h,parent = "body") {
        this.w = w;
        this.h = h;
        this.renderer = new CanvasRenderer(w,h);
        document.querySelector(parent).appendChild(this.renderer.view);
        this.scene = new Container();
    }

    run(gameUpdate = () => {}) {
        let dt = 0;
        let last = 0;
        const loop = ms => {
            requestAnimationFrame(loop);
            const t = ms / 1000; 
            dt = Math.min(t-last, MAX_FRAME);
            last = t;

            this.scene.update(dt, t);
            gameUpdate(dt, t);
            this.renderer.render(this.scene);
        };
        requestAnimationFrame(loop);
    }
}

export default Game;