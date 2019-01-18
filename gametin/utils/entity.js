import math from "./math.js";

function center (entity) {
    const { pos, w, h } = entity;
    return {
        x: Math.floor(pos.x + w / 2),
        y: Math.floor(pos.y + h / 2)
    };
}

function distance (a,b) {
    return math.distance(center(a), center(b));
}

export default {
    center,
    distance
};