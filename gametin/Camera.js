import math from "./utils/math.js";
import Container from "./Container.js";

class Camera extends Container {
    constructor(subject, viewport, worldSize = viewport) {
        super();
        this.w = viewport.w;
        this.h = viewport.h;
        this.worldSize = worldSize;
        this.setSubject(subject);
    }
    setSubject(e) {
        this.subject = e ? e.pos || e : this.pos; //did we pass in an entity with a position, or just a position?
        this.offset = {x:0, y:0};

        //center on entity
        if(e && e.w){ //if the object has a w, offset is center of the object
            this.offset.x += e.w /2;
            this.offset.y += e.h/2;
        }
        if (e && e.anchor) { //if object has an anchor, use that
            this.offset.x -= e.anchor.y;
            this.offset.y -= e.anchor.y;
        }
        //otherwise follow subject is just a point
    }

    focus(){

        const { pos, w, h, worldSize, subject, offset } = this;
        const centeredX = subject.x + offset.x - w /2;
        const maxX = worldSize.w - w;
        const x = -math.clamp(centeredX, 0, maxX);
        const centeredY = subject.y + offset.y - h/2;
        const maxY = worldSize.h - h;
        const y = -math.clamp(centeredY, 0, maxY);

        pos.x = x;
        pos.y = y;

    }
    update(dt, t){

        super.update(dt, t);
        if (this.subject) {
            this.focus();
        }

    }
}

export default Camera;