import Texture from "../../gametin/renderer/Texture.js";
import Sprite from "../../gametin/renderer/Sprite.js";
import Container from "../../gametin/Container.js"

const texture  = new Texture("./res/img/rybartgames.png");

class LogoScreen extends Container {

    constructor(game, onDone){
        super();
        this.onDone = onDone;
        this.life = 2;
        const logo = this.add(new Sprite(texture));
    }
    
    update(dt, t){
        super.update(dt, t);
        this.life -= dt;
        if(this.life < 0) {
            this.onDone();
        }
    }
}

export default LogoScreen