var purple = "#800080";
var lightPurple = "#EAB8E4";
var sparkles = 50;

var x = 400;
var y = 300;
var swide = window.innerWidth;
var shigh = window.innerHeight;
var tiny = [];
var star = [];
var starv = [];
var starx = [];
var stary = [];
var tinyx = [];
var tinyy = [];
var tinyv = [];

let lastMouseMoveTime = 0;
let isSparking = false;

window.onload = function () {
    for (var i = 0; i < sparkles; i++) {
        var tinyParticle = createStar(2, "tiny");
        tinyParticle.style.visibility = "hidden";
        document.body.appendChild((tiny[i] = tinyParticle));

        var starParticle = createStar(5, "star");
        starParticle.style.visibility = "hidden";
        document.body.appendChild((star[i] = starParticle));

        starv[i] = 0;
        tinyv[i] = 0;
    }
    sparkle();
};

function sparkle() {
    
    if (isSparking && Date.now() - lastMouseMoveTime < 500) {
        for (let c = 0; c < sparkles; c++) {
            if (!starv[c]) {
                star[c].style.left = (starx[c] = x) + "px";
                star[c].style.top = (stary[c] = y + 1) + "px";
                star[c].style.visibility = "visible";
                starv[c] = 50;

                
                star[c].style.backgroundColor = Math.random() > 0.5 ? purple : lightPurple;
                break;
            }
        }
    }

    for (let c = 0; c < sparkles; c++) {
        if (starv[c]) update_star(c);
        if (tinyv[c]) update_tiny(c);
    }

    setTimeout(sparkle, 40);
}

function update_star(i) {
    if (--starv[i] == 25) {
        star[i].style.opacity = 0.5;
    }
    if (starv[i]) {
        stary[i] += 1 + Math.random() * 3;
        starx[i] += (i % 5 - 2) / 5;
        if (stary[i] < shigh) {
            star[i].style.top = stary[i] + "px";
            star[i].style.left = starx[i] + "px";
        } else {
            star[i].style.visibility = "hidden";
            starv[i] = 0;
        }
    } else {
        tinyv[i] = 50;
        tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
        tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
        tiny[i].style.backgroundColor = star[i].style.backgroundColor;
        star[i].style.visibility = "hidden";
        tiny[i].style.visibility = "visible";
    }
}

function update_tiny(i) {
    if (--tinyv[i] == 25) {
        tiny[i].style.opacity = 0;
    }
    if (tinyv[i]) {
        tinyy[i] += 1 + Math.random() * 3;
        tinyx[i] += (i % 5 - 2) / 5;
        if (tinyy[i] < shigh) {
            tiny[i].style.top = tinyy[i] + "px";
            tiny[i].style.left = tinyx[i] + "px";
        } else {
            tiny[i].style.visibility = "hidden";
            tinyv[i] = 0;
        }
    } else tiny[i].style.visibility = "hidden";
}

document.onmousemove = function (e) {
    if (e) {
        y = e.pageY;
        x = e.pageX;
        lastMouseMoveTime = Date.now();
        isSparking = true;
    }
};

function createStar(size, type) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.width = size + "px";
    div.style.height = size + "px";
    div.style.backgroundColor = "transparent";
    div.style.clipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
    div.style.transition = "opacity 0.5s ease";
    div.style.borderColor = "transparent";
    div.style.borderWidth = "0";
    return div;
}
