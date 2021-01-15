class Graph {
    constructor(ctx, width, height) {
        this._ctx = ctx;
        this._width = width;
        this._height = height;
    }
    
    drawRects(arr) {
        const length = arr.length;
        let offset = 2;
        let w = (this._width - (length - 1) * offset) / length;            
        w = Math.min(10, w);
        
        let padding = 
            (this._width - ((w * length) + (length - 1) * offset)) / 2;
        
        if(w < 1) {
            padding = 0;
            offset = 0;
            w = this._width / length;
        }
        
        this._ctx.fillStyle = "blue";
        this._ctx.clearRect(0, 0, this._width, this._height);  
        
        arr.forEach((element, i) => {
            const h = (element / length) * this._height;
            const x =  (w + offset) * i + padding;
            const y = (this._height - h);
            this._ctx.fillRect(x, y, w, h);
        });
    }
}