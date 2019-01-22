import math from "./math.js";

function center (entity) {
    const { pos, w, h } = entity;
    return {
        x: pos.x + w / 2,
        y: pos.y + h / 2
    };
}

function distance (a,b) {
    return math.distance(center(a), center(b));
}

function bounds(entity) {
    const { w, h, pos, hitBox } = entity;
     //if entity doesn't have a separate hitbox, we just use the the position and size
    const hit = hitBox || {x: 0, y: 0, w, h }

    return  {
        x: hit.x + pos.x,
        y: hit.y + pos.y,
        w: hit.w -1,
        h: hit.h -1
    };
}

export default {
    center,
    distance
};