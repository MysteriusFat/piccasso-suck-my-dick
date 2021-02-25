function CopyPolygon (poly) {
    let new_poly = new Polygon(poly.colorArray, poly.vectorsSize);
    for (let i=0 ; i<new_poly.vectorsSize ; i++) {
        new_poly.vectors[i][0] = poly.vectors[i][0];
        new_poly.vectors[i][1] = poly.vectors[i][1];
    }
    return new_poly;
}

class Polygon {
    constructor (color, vectorsSize, mutateRatio=0.5) {
        this.vectorsSize = vectorsSize;
        this.mutateRatio = mutateRatio;

        this.vectors = new Array(vectorsSize);
        for (let i=0 ; i<vectorsSize ; i++) {
            let x = Math.floor(Math.random() * 300);
            let y = Math.floor(Math.random() * 450);
            this.vectors[i] = [x,y];
        }
        this.colorArray = color;
        this.color = "rgba("+color[0]+","+color[1]+","+color[2]+","+color[3]+")";
    }

    Mutate () {
        if (Math.random() >= this.mutateRatio) {
            const color = GenerateColor();
            this.colorArray = color;
            this.color = "rgba("+color[0]+","+color[1]+","+color[2]+","+color[3]+")";
        } else {
            const index = Math.floor(Math.random() * this.vectorsSize);
            const x = Math.floor(Math.random() * 300);
            const y = Math.floor(Math.random() * 450);
            this.vectors[index] = [x,y];
        }
    }

    render (ctx) {
        ctx.beginPath();
        ctx.moveTo(this.vectors[0][0], this.vectors[0][1]);
        for (let i=1 ; i<this.vectorsSize ; i++) {
            ctx.lineTo(this.vectors[i][0], this.vectors[i][1]);
        }
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        return true;
    }
}
