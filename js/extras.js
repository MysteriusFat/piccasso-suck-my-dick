populationSlide = document.getElementById("population");
mutationRatioSlider = document.getElementById("mutation-ratio");
dnaSizeSlider = document.getElementById("dna-size");


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


