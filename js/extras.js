populationSlide = document.getElementById("population");
mutationRatioSlider = document.getElementById("mutation-ratio");
dnaSizeSlider = document.getElementById("dna-size");
inputFile = document.getElementById("file");

populationSlide.addEventListener("change", function (event) {
    event.path[1].children[0].children[1].innerHTML = event.target.value;
});

mutationRatioSlider.addEventListener("change", function (event) {
    console.log(event.path[1].children[0].children[1])
    event.path[1].children[0].children[1].innerHTML = event.target.value / 100;
});

dnaSizeSlider.addEventListener("change", function (event) {
    console.log(event.path[1].children[0]);
    event.path[1].children[0].children[1].innerHTML = event.target.value;
});

file.addEventListener("change", function(event) {
    var output = document.getElementById('upload-images');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
        const ctx = document.getElementById('canvasImg').getContext('2d');
        ctx.clearRect(0, 0, 300, 450);
        ctx.drawImage(output, 0, 0, width, height);
    }
});
