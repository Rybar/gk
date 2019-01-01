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
        const { anims } = this;
        anims.add('walk', [
            {x: 0, y: 0 },
            {x: 1, y: 0 },
            {x: 2, y: 0 },
            {x: 3, y: 0 }
            ], 0.07);
        anims.add('dead', [{x: 4, y: 0 }], 1);
        this.speed = math.rndFloat(20,100);

    }
    

    update (dt, t) {
        
        const { pos, speed, rate, anims } = this;
        this.curTime += dt;
        pos.x += speed * dt;
        if(speed != 0){
            anims.play('walk');
        } else {
            anims.play('dead');
        } 
        // if(this.curTime > rate){
        //     this.frame = frames[this.curFrame++ % 4];
        //     this.curTime -= rate;
        // }
        super.update(dt);
        
    }
}
export default Squizz;