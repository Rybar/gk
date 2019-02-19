import gt from "../../gametin/index.js";
const { TileSprite, Texture, math } = gt;
const texture = new Texture('./res/img/protoTiles.png');

class Baddie extends TileSprite {
    constructor (xSpeed, ySpeed) {
        super(texture, 16, 16);
        this.w = 16;
        this.h = 16;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        const { anims } = this;
        anims.add('idle', [
            {x: 5, y: 0 },
            {x: 5, y: 0 },
        ],0.07);
    }
    update(dt) {
        const {pos, xSpeed,ySpeed, anims} = this;
        anims.play('idle');
        pos.x += xSpeed * dt;
        pos.y += ySpeed * dt;
    }

}

export default Baddie;