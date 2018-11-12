const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let coordSnake;
let coordFood;
let width = 12,
    height = 12;
let animation,
    position,
    runGame,
    speed = 50;


function createSnake() {
    coordSnake = [[120, 240], [135, 240], [150, 240], [165, 240]];
    ctx.fillStyle = 'ghostwhite';
    for (let i = 0; i < coordSnake.length; i++) {
        ctx.fillRect(coordSnake[i][0], coordSnake[i][1], width, height);
       
    }
}

function createFood() {
    coordFood = [300, 240];
    ctx.fillStyle = '#7bd17b';
    ctx.fillRect(coordFood[0], coordFood[1], 12, 12);
}

function animationSnake(top, right, bottom, left) {
    let lastElemArr = coordSnake.length - 1;
    animation = setInterval(function(){
        ctx.clearRect(coordSnake[0][0], coordSnake[0][1], 12, 12);
        coordSnake.push(coordSnake[0]);
        coordSnake.splice(0, 1);
        if (top) {
            coordSnake[coordSnake.length - 1][0] = coordSnake[coordSnake.length - 2][0];
            coordSnake[coordSnake.length - 1][1] = coordSnake[coordSnake.length - 2][1] - 15;
        } else if (right) {
            coordSnake[coordSnake.length - 1][0] = coordSnake[coordSnake.length - 2][0] + 15;
            coordSnake[coordSnake.length - 1][1] = coordSnake[coordSnake.length - 2][1];
        } else if (bottom) {
            coordSnake[coordSnake.length - 1][0] = coordSnake[coordSnake.length - 2][0];
            coordSnake[coordSnake.length - 1][1] = coordSnake[coordSnake.length - 2][1] + 15;
        } else if (left) {
            coordSnake[coordSnake.length - 1][0] = coordSnake[coordSnake.length - 2][0] - 15;
            coordSnake[coordSnake.length - 1][1] = coordSnake[coordSnake.length - 2][1] ;
        }
    ctx.fillStyle = 'ghostwhite';
    ctx.fillRect(coordSnake[coordSnake.length - 1][0], coordSnake[coordSnake.length - 1][1], 12, 12);
    gameOver();
    eatFood();
    }, speed)
}

onkeydown = function(e) {
    if (runGame) {
        if (e.keyCode === 37) {
            if (position === 'top' || position === 'bottom') {
                position = 'left';
                clearInterval(animation);
                animationSnake(false, false, false, true);
            }
        } else if (e.keyCode === 38) {
            if (position === 'left' || position === 'right') {
                position = 'top';
                clearInterval(animation);
                animationSnake(true, false, false, false);
            }
        } else if (e.keyCode === 39) {
            if (position === 'top' || position === 'bottom') {
                position = 'right';
                clearInterval(animation);
                animationSnake(false, true, false, false);
            }
        } else if (e.keyCode === 40) {
            if (position === 'left' || position === 'right') {
                position = 'bottom';
                clearInterval(animation);
                animationSnake(false, false, true, false);
            }
        }
    }
}


function randomCreateFood(min, max) {
        let exluded = coordSnake.map(x => x[0]);
        let random = [];
        for (let i = min; i <= max; i++) {
            if (exluded.indexOf(i) === -1) {
                random.push(i);
            }
        }
        let num = random[Math.floor(Math.random() * random.length)];
        return (num % 15 !== 0) ? randomCreateFood(min, max) : num;
    }


function eatFood() {
    let result = [];
     let lastElemArr = coordSnake.length - 1;
    for (let i = 0; i < coordFood.length; i++) {
        result.push(Math.abs(coordFood[i] - coordSnake[lastElemArr][i]));
    }
    const fullMath = result.filter(x => x <= 5);
    if (fullMath.length === coordFood.length) {
        ctx.clearRect(coordFood[0], coordFood[1], 12, 12);
        ctx.fillStyle = 'ghostwhite';
        ctx.fillRect(coordFood[0], coordFood[1], 12, 12);
        coordFood[0] = randomCreateFood(100, 500);
        coordFood[1] = randomCreateFood(100, 500);
        ctx.fillStyle = '#7bd17b';
        ctx.fillRect(coordFood[0], coordFood[1], 12, 12);
        ctx.fillStyle = 'ghostwhite';
        if (position === 'top') {
            ctx.fillRect(coordSnake[coordSnake.length - 1][0], coordSnake[coordSnake.length - 1][1] - 15, 12, 12);
            coordSnake.push([coordSnake[coordSnake.length - 1][0], coordSnake[coordSnake.length - 1][1] - 15]);
        } else if (position === 'right') {
            ctx.fillRect(coordSnake[coordSnake.length - 1][0] + 15, coordSnake[coordSnake.length - 1][1], 12, 12);
            coordSnake.push([coordSnake[coordSnake.length - 1][0] + 15, coordSnake[coordSnake.length - 1][1]]);
        } else if (position === 'bottom') {
            ctx.fillRect(coordSnake[coordSnake.length - 1][0], coordSnake[coordSnake.length - 1][1] + 15, 12, 12);
            coordSnake.push([coordSnake[coordSnake.length - 1][0], coordSnake[coordSnake.length - 1][1] + 15]);
        } else if (position === 'left') {
            ctx.fillRect(coordSnake[coordSnake.length - 1][0] - 15, coordSnake[coordSnake.length - 1][1], 12, 12);
            coordSnake.push([coordSnake[coordSnake.length - 1][0] - 15, coordSnake[coordSnake.length - 1][1]]);
        }
    } 
}


function gameOver() {
    for (let i = 0; i < coordSnake.length - 2; i++) {
       if ((coordSnake[coordSnake.length - 1][0] === coordSnake[i][0] && coordSnake[coordSnake.length - 1][1] === coordSnake[i][1]) || (coordSnake[coordSnake.length - 1][0] > canvas.width || coordSnake[coordSnake.length - 1][0] < 0 || coordSnake[coordSnake.length - 1][1] > canvas.height || coordSnake[coordSnake.length - 1][1] < 0)) {
           runGame = false;
           clearInterval(animation);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            createSnake();
            createFood();
           console.log('game over!')
       }
    }  
}


run.onclick = function() {
    position = 'right';
    animationSnake(false, true, false, false);
    runGame = true;
}

let speedButtons = document.myForm.myRadio;
for (let i = 0; i < speedButtons.length; i++) {
    speedButtons[i].onclick = function () {
        speed = this.value === "1" ? 125 : this.value === "2" ? 100 : this.value === "3" ? 75 : 50;  
    }
}

createSnake();
createFood();