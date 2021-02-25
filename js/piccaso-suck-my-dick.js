function stop () {
    is_running = false;
}

function ConfigureSimulation () {
    populationSize = document.getElementById('population').value;
    mutationRatio = document.getElementById('mutation-ratio').value / 100;
    dnaSize = document.getElementById('dna-size').value;

    console.log(populationSize, mutationRatio, dnaSize);

    population = new Array(populationSize);
    for (let i=0 ; i<populationSize ; i++) {
        population[i] = new Artist(dnaSize, mutationRatio, true);
    }
}

function RunSimulation () {
    for (let i=0 ; i<populationSize ; i++ ) {
        actualFitness = population[i].GetFitness(imgCanvas);
        if (actualFitness > bestFitness || generation == 0 && i == 0) {
            bestFitness = actualFitness;
            bestArtist = population[i];
        }
    }

    bestArtist.render(artCanvas);
    for (let i=0 ; i<populationSize ; i++) {
        population[i] = bestArtist.Breed(population[i]);
        population[i].Mutate();
    }
    generation++;
}

function run () {
    ConfigureSimulation();
    interval = setInterval(RunSimulation, 0);
}

function stop () {
    clearInterval(interval);
}

// Draw image when page fully load
window.addEventListener('load', function () {
    const img = document.getElementById('scream');
    imgCanvas.drawImage(img, 0, 0, 300, 450);
})

// Sizes
const height = 450;
const width = 300;

// Canvas
const artCanvas = document.getElementById('canvasArt').getContext('2d');
const imgCanvas = document.getElementById('canvasImg').getContext('2d');
const workCanvas = document.getElementById('canvasWork').getContext('2d');

// Simulation 
let populationSize = 1;
let mutationRatio = 0;
let dnaSize = 30;
let population = [];

// Helpers
let generation = 0;
let actualFitness = 0.00;
let bestFitness = 0.00;
let bestArtist = 0;

// Intervals
let interval = 0;

