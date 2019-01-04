import gt from "../../gametin/index.js";
const { TileSprite, Texture, math } = gt;
const texture = new Texture('./res/img/squizz-Sheet.png');

class Squizz extends TileSprite {
    constructor(controls) {
        super(texture, 32, 32);

        //this.anchor = {x: -16, y: -16 };
        this.rate = 0.5;
        this.curTime = 0;
        this.curFrame = 0;
        this.controls = controls;

        const { anims } = this;
        anims.add('walk', [
            {x: 0, y: 0 },
            {x: 1, y: 0 },
            {x: 2, y: 0 },
            {x: 3, y: 0 }
            ], 0.07);
        anims.add('dead', [{x: 4, y: 0 }], 1);
        this.speed = 0.15;
        this.dir = {
            x: 1,
            y: 0
        };


    }
    

    update (dt, t) {
        
        const { pos, speed, rate, anims, controls, dir } = this;
        const { x, y } = controls;
        
        if(speed != 0){
            anims.play('walk');
        } else {
            anims.play('dead');
        }
        if(x && x !== dir.x){
            dir.x = x;
            dir.y = 0;
            pos.y = Math.round(pos.y / 32) * 32; //y snapping

        } else if (y && y !== dir.y) {
            dir.y = y;
            dir.x = 0;
            pos.x = Math.round(pos.x / 32) * 32; //x snapping
        }

        pos.x += dir.x * dt * (32 / speed);
        pos.y += dir.y * dt * (32 / speed);


        
        super.update(dt);
        
    }
}
export default Squizz;