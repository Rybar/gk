import gt from "../../gametin/index.js";
const { TileSprite, Texture, math } = gt;
const texture = new Texture('./res/img/baddie-Sheet.png');

class Baddie extends TileSprite {
    constructor (xSpeed, ySpeed) {
        super(texture, 32, 32);
        this.w = 32;
        this.h = 32;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }
    update(dt) {
        const {pos, xSpeed,ySpeed} = this;
        pos.x += xSpeed * dt;
        pos.y += ySpeed * dt;
    }

}

export default Baddie;