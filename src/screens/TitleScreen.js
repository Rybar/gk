import Container from "../../gametin/Container.js";
import Texture from "../../gametin/renderer/Texture.js";
import Sprite from "../../gametin/renderer/Sprite.js";

const texture = new Texture("./res/img/squizzball.png");
class TitleScreen extends Container {
    constructor(game, controls, onStart) {
        super();
        this.onStart = onStart;
        this.controls = controls;
        this.title = this.add(new Sprite(texture));
        controls.reset();
    }
    update(dt, t){
        const {title, controls} = this;
        title.pos.y += Math.sin(t*5) * 0.4;
        if(controls.action){
            this.onStart();
        }
    }
}

export default TitleScreen