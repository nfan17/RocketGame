let rocketImg = document.querySelector(".rocketImg");
let modif = 10;
let count = 0;
let start = document.querySelector(".start");

var blink_speed = 1000;
let t = window.setInterval(function () { 
    if (start.style.visibility == "hidden") {start.style.visibility = "visible";}
    else {start.style.visibility = "hidden";}
}, blink_speed);

rocketImg.style.visibility = "hidden";

function startGame() {
    rocketImg.style.position = "absolute";
    rocketImg.style.left = 0;
    rocketImg.style.right = 0;
    rocketImg.style.visibility = "visible";
    clearInterval(t)
    start.style.visibility = "hidden";
    count++;
}

window.addEventListener("keydown", (e) => {
    switch(e.key) {
        case " ":
            if (count == 0) {
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
})