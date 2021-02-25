function GenerateColor () {
    const R = Math.floor(Math.random() * 255);
    const G = Math.floor(Math.random() * 255);
    const B = Math.floor(Math.random() * 255);
    const A = Math.random() * 0.3;
    return [R,G,B,A];
}

function CopyArtist(artist) {
    let newArtist = new Artist(artist.dnaSize);
    newArtist.fitness = artist.fitness;
    for (let i=0 ; i<newArtist.dnaSize ; i++) {
        newArtist.DNA[i] = CopyPolygon(artist.DNA[i]);
    }
    return newArtist;
}

class Artist {
    constructor (dnaSize, mutationRatio, firstGeneration) {
        this.dnaSize = dnaSize;
        this.mutationRatio = mutationRatio;
        this.DNA = new Array(this.dnaSize);
        this.fitness = 0.00;

        if (firstGeneration) {
            for (let i=0 ; i<this.dnaSize ; i++) {
                let color = GenerateColor();
                let numberVectors = Math.floor(Math.random() * 3) + 3;
                this.DNA[i] = new Polygon(color, numberVectors);
            }
        }
    }

    GetFitness (image) {
        this.fitness = 0.00;
        let tmpFitness = 0.00;
        this.render(workCanvas);
        
        let imageData = image.getImageData(0, 0, width, height).data;
        let artData = workCanvas.getImageData(0, 0, width ,height).data;
        for (let i=0 ; i<450*300*4; i++) {
            tmpFitness += Math.pow(imageData[i]-artData[i], 2);
        }
        this.fitness = 1 - tmpFitness / (height * width * 256 * 256 * 4);
        return this.fitness;
    }

    Mutate () {
        let index = Math.floor(Math.random() * this.dnaSize);
        this.DNA[index].Mutate();
    }
    // Generaly this methods is called by best artist
    Breed (couple) {
        let child = new Artist(couple.dnaSize, false);
        for (let i=0 ; i<child.dnaSize ; i++) {
            if (Math.random() < 0.5) {
                child.DNA[i] = CopyPolygon(couple.DNA[i]);
            } else {
                child.DNA[i] = CopyPolygon(this.DNA[i]);
            }
        }
        return child;
    }

    render (ctx) {
        ctx.clearRect(0, 0, 300, 450);
        for (let i=0 ; i<this.dnaSize ; i++) {
            this.DNA[i].render(ctx);
        }
    }
}
