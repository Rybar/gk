function rndInt(min, max) {
    if(max == null) {
        max = min || 1;
        min = 0;
    }
    return Math.floor( Math.random() * (max - min) + min );
}

function rndFloat(min, max) {
    if(max == null) {
        max = min || 1;
        min = 0;
    }
    return Math.random() * (max - min) + min;
}

function rndOneIn(max = 2){
    return rndInt(0,max) === 0;
}

function rndOneFrom(items){
    return items[rndInt(items.length)];
}

export default {
    rndInt,
    rndFloat,
    rndOneIn,
    rndOneFrom
};

