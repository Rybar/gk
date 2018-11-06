const canvas = document.querySelector('#game canvas');
const ctx = canvas.getContext('2d');
console.log(ctx.canvas);
const { width: w, height: h } = canvas;
const center = w /2;
const img = new Image();
img.src = 'res/img/rick.png';
img.addEventListener('load',draw,false);
 
ctx.fillRect(0,0,w,h);
ctx.fillStyle = '#555';

let x, y, radius;
for(let i = 0; i < 550; i++){
    x = Math.random() * w;
    y = Math.random() * h;
    radius = Math.random() * 3;
    ctx.beginPath();
    ctx.arc(x,y, radius, 0, Math.PI * 2, false);
    ctx.fill();
}
ctx.translate(w/2,h/2);
for(let ring = 1; ring < 28; ring++){
    ctx.fillStyle = `hsl(${ring * 25}, 90%, 50%)`;
    for(let dots = 0; dots < ring * 6; dots++) {
        
        ctx.rotate((Math.PI * 2) / (ring * 6));
        ctx.beginPath();
        ctx.arc(0,ring * 15, 7, 0, Math.PI*2, true);
        ctx.fill();
    }
}
ctx.restore();


function draw() {
    for(let i=0; i < 10; i++) {
        const x = Math.random() * w - 50;
        const y = Math.random() * h - 100;
        ctx.drawImage(img,x,y);
    }
}