import KeyControls from "/src/lib/KeyControls.js"

const canvas = document.querySelector('#game canvas');
const ctx = canvas.getContext('2d');
console.log(ctx.canvas);
const { width: w, height: h } = canvas;
const center = w /2;
const controls = new KeyControls();

let dt = 0;
let last = 0;
let x = w/2;
let y = h/2;
let color = 0;
ctx.fillStyle = '#000';
ctx.strokeStyle = '#fff';
ctx.fillRect(0,0,w,h);

function loopy (ms) {
    requestAnimationFrame(loopy);

    const t = ms / 1000;
    dt = t - last;
    last = t;

   ctx.strokeText(`Frame length: ${ (dt*1000).toFixed(2)} ms`, 70, 50);
   ctx.strokeText(`Total time: ${ t.toFixed(2)}`, 70, 90);

    x += controls.x*2;
    y += controls.y*2;
    if (!controls.action) {
        color += 10;
        if (color > 360) {
            color -= 360;
        }
    }
    
   ctx.fillStyle = `hsl(${color}, 50%, 50%)`;
   ctx.globalAlpha = 1;
   ctx.fillRect(x,y,50,50);
}

requestAnimationFrame(loopy);