import gt from "../../gametin/index.js";
const { TileSprite, Texture, math } = gt;
const texture = new Texture('./res/img/squizz-Sheet.png');

class Squizz extends TileSprite {
    constructor() {
        super(texture, 32, 32);
        this.anchor = {x: -16, y: -16 };
        this.rate = 0.5;
        this.curTime = 0;
        this.curFrame = 0;
        this.frames = [
            {x: 0, y: 0 },
            {x: 1, y: 0 },
            {x: 2, y: 0 },
            {x: 3, y: 0 },
            {x: 4, y: 0 }
        ];
        this.frame = this.frames[this.curFrame];
        this.speed = math.rndFloat(20,100);
    }
    

    update (dt, t) {
        const { pos, speed, rate, frames } = this;
        this.curTime += dt;
        pos.x += speed * dt;
        if(this.curTime > rate){
            this.frame = frames[this.curFrame++ % 4];
            this.curTime -= rate;
        }
        
    }
}
export default Squizz;