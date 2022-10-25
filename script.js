var rocketImg = document.querySelector(".rocketImg");
var asteroidImg = document.querySelector(".asteroid");
var stars = document.querySelector(".stars");
var starCollec = [];
var modif = 15;
var count = 0;
var start = document.querySelector(".start");
var playArea = document.querySelector("#playArea")
var runGame = false;
var quadSpeed = 1.05;

var blink_speed = 1000;
var startBlink = window.setInterval(() => { 
    if (start.style.visibility == "hidden") {start.style.visibility = "visible";}
    else {start.style.visibility = "hidden";}
}, blink_speed);

rocketImg.style.visibility = "hidden";
asteroidImg.style.visibility = "hidden";
stars.style.visibility = "hidden";

window.addEventListener("keydown", (e) => {
    switch(e.key) {
        case " ":
            if (count == 0) {
                runGame = true;
                startGame();
            }
            break;
        case "ArrowLeft":
            if (parseInt(rocketImg.style.left) > -400) {
                rocketImg.style.left = parseInt(rocketImg.style.left) - modif 
                + "px";
            }
            break;
        case "ArrowRight":
            if (parseInt(rocketImg.style.left) < 400) {
                rocketImg.style.left = parseInt(rocketImg.style.left) + modif 
                + "px";
            }
            break;
    }
});

var addStars = window.setInterval(() => {
    if (runGame) {
        var star = document.createElement("div");
        star.classList.add("stars");
        star.style.left = Math.floor(Math.random() * 498) + "px";
        playArea.appendChild(star);
    }
}, 600);

var addAsteroids = window.setInterval(() => {
    if (runGame) {
        var asteroid = document.createElement("div");
        asteroid.classList.add("asteroid");
        asteroid.style.left = Math.floor(Math.random() * 430) + "px";
        var aSize = Math.floor(Math.random() * (65 - 35) + 35) + "px";
        asteroid.style.height = aSize;
        asteroid.style.width = aSize;
        playArea.appendChild(asteroid);
    }
}, 2000);

var downMovement = window.setInterval(() => {
    var asters = document.getElementsByClassName("asteroid");
    var stars = document.getElementsByClassName("stars");
    if (asters != undefined) {
        for (var n = 0; n < asters.length; n++) {
            var asts = asters[n];
            var astTop = parseInt(window.getComputedStyle(asts).getPropertyValue("top"));
            asts.style.top = astTop + 30 + "px";
        }
        if (quadSpeed <= 4) {
            quadSpeed *= quadSpeed;
        }
    }
    if (stars != undefined) {
        for (var n = 0; n < stars.length; n++) {
            var s = stars[n];
            var sTop = parseInt(window.getComputedStyle(s).getPropertyValue("top"));
            s.style.top = sTop + 60 + "px";
            }
    }
}, 1000 / quadSpeed);

function startGame() {
    rocketImg.style.position = "absolute";
    rocketImg.style.left = 0;
    rocketImg.style.right = 0;
    rocketImg.style.visibility = "visible";
    clearInterval(startBlink)
    start.style.display = "none";
    count++;
}



