var rocketImg = document.querySelector(".rocketImg");
var rocketHBox = document.querySelector(".rocketHBox");
var asteroidImg = document.querySelector(".asteroid");
var stars = document.querySelector(".stars");
var start = document.querySelector(".start");
var playArea = document.querySelector("#playArea")
var modif = 15;
var count = 0;
var runGame = false;
var quadSpeed = 1.05;

rocketImg.style.visibility = "hidden";
//rocketHBox.style.visibility = "hidden";
asteroidImg.style.visibility = "hidden";
stars.style.visibility = "hidden";

// Start Screen
const ONE_SEC = 1000;
var startBlink = window.setInterval(() => { 
    if (start.style.visibility == "hidden") {start.style.visibility = "visible";}
    else {start.style.visibility = "hidden";}
}, ONE_SEC);

// Check for Inputs
window.addEventListener("keydown", (e) => {
    switch(e.key) {
        case " ":
            if (count == 0) {
                runGame = true;
                startGame();
            }
            break;
        case "ArrowLeft":
            if (parseInt(rocketImg.style.left) > -410) {
                rocketImg.style.left = parseInt(rocketImg.style.left) - modif 
                + "px";
            }
            if (parseInt(rocketHBox.style.left) > -410) {
                rocketHBox.style.left = parseInt(rocketHBox.style.left) - modif 
                + "px";
            }
            break;
        case "ArrowRight":
            if (parseInt(rocketImg.style.left) < 410) {
                rocketImg.style.left = parseInt(rocketImg.style.left) + modif 
                + "px";
            }
            if (parseInt(rocketHBox.style.left) < 410) {
                rocketHBox.style.left = parseInt(rocketHBox.style.left) + modif 
                + "px";
            }
            break;
    }
});

// Generate Background Stars
var addStars = window.setInterval(() => {
    if (runGame) {
        var star = document.createElement("div");
        star.classList.add("stars");
        star.style.left = Math.floor(Math.random() * 498) + "px";
        playArea.appendChild(star);
    }
}, 600);

// Generate Asteroid Obstacles
var addAsteroids = window.setInterval(() => {
    if (runGame) {
        var asteroid = document.createElement("div");
        asteroid.classList.add("asteroid");
        asteroid.style.left = Math.floor(Math.random() * 430) + "px";
        var aSize = Math.floor(Math.random() * (65 - 35) + 35);
        asteroid.style.height = (aSize *9187 / 10000) + "px";
        asteroid.style.width = aSize + "px";
        playArea.appendChild(asteroid);
    }
}, 2000);

// Move Asteroids and Stars Downwards
var downMovement = window.setInterval(() => {
    if (runGame) {
        let asters = document.getElementsByClassName("asteroid");
        let stars = document.getElementsByClassName("stars");
        if (asters != undefined) {
            for (let n = 0; n < asters.length; n++) {
                let asts = asters[n];
                let astTop = parseInt(window.getComputedStyle(asts).getPropertyValue("top"));
                asts.style.top = astTop + 30 + "px";
                if (asts.style.top >= 550) {
                    playArea.removeChild(asts);
                }
            }
            if (quadSpeed <= 15) {quadSpeed *= quadSpeed;}
        }
        if (stars != undefined) {
            for (var n = 0; n < stars.length; n++) {
                var s = stars[n];
                var sTop = parseInt(window.getComputedStyle(s).getPropertyValue("top"));
                s.style.top = sTop + 60 + "px";
                }
        }
    }
}, (ONE_SEC / quadSpeed));

// Check if rocket hits any asteroids
var checkAstCollisions = window.setInterval(() => {
    if (runGame) {
        let asters = document.getElementsByClassName("asteroid");
        if (asters != undefined) {
            for (let n = 0; n < asters.length; n++) {
                console.log(isOverlapping(asters[n], rocketHBox));
                if (isOverlapping(asters[n], rocketHBox)) {
                    gameStop();
                }
            }
        }
    }
}, 100);

// Make stars hidden when passing asteroids
var checkStarCollisions = window.setInterval(() => {
    if (runGame) {
        let asters = document.getElementsByClassName("asteroid");
        if (asters != undefined) {
            for (let n = 0; n < asters.length; n++) {
                console.log(isOverlapping(asters[n], rocketHBox));
                if (isOverlapping(asters[n], rocketHBox)) {
                    gameStop();
                }
            }
        }
    }
}, 100);

// Start Game: Clear start screen and enable game functions
function startGame() {
    rocketImg.style.position = "absolute";
    rocketImg.style.left = 0;
    rocketImg.style.right = 0;
    rocketImg.style.visibility = "visible";
    rocketHBox.style.position = "absolute";
    rocketHBox.style.left = 0;
    rocketHBox.style.right = 0;
    clearInterval(startBlink)
    start.style.display = "none";
    count++;
}

// Check for overlap of game elements
function isOverlapping(a, b) {
    const obj1 = a.getBoundingClientRect();
    const obj2 = b.getBoundingClientRect();
    const horizontalOverlap = obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x;
    const verticalOverlap = obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y;
    const isOverlapping = horizontalOverlap && verticalOverlap;
    return isOverlapping;
  }

// Stops game functions and causes rocket flash effect upon loss
function gameStop() {
    setTimeout(() => {
        runGame = false;
    }, 100);
    var hit = setInterval(() => {
        if (rocketImg.style.visibility == "hidden") {rocketImg.style.visibility = "visible";}
    else {rocketImg.style.visibility = "hidden";}
    }, 300);
    setTimeout(() => {
        clearInterval(hit);
    }, 1500);
}



