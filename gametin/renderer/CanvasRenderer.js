class CanvasRenderer {
    constructor (w, h) {
        const canvas = document.createElement(`canvas`);
        this.w = canvas.width = w;
        this.h = canvas.height = h;
        this.view = canvas;
        this.ctx = canvas.getContext(`2d`);
        this.ctx.textBaseline = 'top';
    }

    render(container, clear = true) {
        const { ctx } = this;

        function renderRec(container){
            //render children
            container.children.forEach(child => {
                if(child.visible == false){
                    return;
                }
                ctx.save();
                //draw node
                if(child.pos){
                    ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
                }
                //handle types
                if(child.text) {
                    const { font, fill, align } = child.style;
                    if (font) ctx.font = font;
                    if (fill) ctx.fillStyle = fill;
                    if (align) ctx.textAlign = align;
                    ctx.fillText(child.text, 0, 0);
                }

                //recursively render children
                if(child.children){
                    renderRec(child);
                }

                ctx.restore();
            });
        }

        if(clear){
            ctx.clearRect(0,0, this.w, this.h);
        }
        renderRec(container);
    }
}
export default CanvasRenderer;