// P5 SOUND GAME STARTER!

backgroundColor = [255,255,255];

// SOUNDS
const sounds = Array.from({ length: 8 });

// OBJECTS
const ball1 = {
    x: 250,
    y: 300,
    d: 400,
    xspeed: 1,
    yspeed: 2,
    rightSound: sounds[0],
    leftSound: sounds[1],
    fillColor: [255,255,255],
    strokeColor: [0,0,0],
    outlineWidth: 6,
    soundLength: 2000,
}

const ball2 = {
    x: 300,
    y: 300,
    d: 300,
    xspeed: 2,
    yspeed: -1.5,
    rightSound: sounds[2],
    leftSound: sounds[3],
    fillColor: [255,255,255],
    strokeColor: [0,0,0],
    outlineWidth: 6,
    soundLength: 1000,
}

const ball3 = {
    x: 300,
    y: 200,
    d: 150,
    xspeed: 2,
    yspeed: 3,
    rightSound: sounds[4],
    leftSound: sounds[5],
    fillColor: [255,255,255],
    strokeColor: [0,0,0],
    outlineWidth: 6,
    soundLength: 500,
}

const ball4 = {
    x: 300,
    y: 300,
    d: 200,
    xspeed: -1,
    yspeed: 2,
    rightSound: sounds[6],
    leftSound: sounds[7],
    fillColor: [255,255,255],
    strokeColor: [0,0,0],
    outlineWidth: 6,
    soundLength: 500,
}

const ball5 = {
    x: 250,
    y: 500,
    d: 100,
    xspeed: 4,
    yspeed: -3,
    rightSound: sounds[0],
    leftSound: sounds[1],
    fillColor: [255,255,255],
    strokeColor: [0,0,0],
    outlineWidth: 6,
    soundLength: 500,
}

const balls = [ball1, ball2, ball3, ball4, ball5];

// LINES

const edgeColor = [0,0,0];
const edgeWidth = 5;
const activeEdgeColor = [255,0,255];
const activeEdgeWidth = 8;


const topEdge = {
    x1: 0,
    y1: 0,
    x2: 800,
    y2: 0,
    strokeColor: edgeColor,
    strokeWidth: edgeWidth,
}

const bottomEdge = {
    x1: 0,
    y1: 800,
    x2: 800,
    y2: 800,
    strokeColor: edgeColor,
    strokeWidth: edgeWidth,
}

const leftEdge = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 800,
    strokeColor: edgeColor,
    strokeWidth: edgeWidth,
}

const rightEdge = {
    x1: 800,
    y1: 0,
    x2: 800,
    y2: 800,
    strokeColor: edgeColor,
    strokeWidth: edgeWidth,
}

const edges = [leftEdge, rightEdge, topEdge, bottomEdge];

// FUNCTIONS

// const getRandomColor = () => [Math.floor(Math.random() * 2 ** 8), Math.floor(Math.random() * 2 ** 8), Math.floor(Math.random() * 2 ** 8)];

const getRandomColor = () =>`#${Math.floor(Math.random() * 2 ** 24).toString(16)}`;

const displayBall = ({x, y, d, strokeColor, outlineWidth, fillColor}) => {
    stroke(strokeColor);
    strokeWeight(outlineWidth);
    fill(fillColor);
    ellipse(x, y, d);
}

const drawLine = ({x1, y1, x2, y2, strokeColor, strokeWidth}) => {
    stroke(strokeColor);
    strokeWeight(strokeWidth);
    line(x1, y1, x2, y2);
}

function resetLine(edge){
    edge.strokeColor = edgeColor;
    edge.strokeWidth = edgeWidth;
}

function activateLine(edge){
    edge.strokeColor = activeEdgeColor;
    edge.width = activeEdgeWidth;
    setTimeout(() => resetLine(edge), 500);
}

function resetBall(ball, original){
    ball.fillColor = original;
}

function activateBall(ball) {
    original = ball.fillColor;
    ball.fillColor = getRandomColor();
    backgroundColor = getRandomColor();
    // setTimeout(() => resetBall(ball, original), 200);
}

function updateBall(ball){
    console.log(ball.x);
    if(ball.x + ball.d / 2 > rightEdge.x1 ){
        new_yspeed = ball.xspeed;
        ball.xspeed = ball.yspeed;
        ball.yspeed = new_yspeed;
        ball.xspeed *= -1;
        ball.rightSound.play();
        activateLine(rightEdge);
        activateBall(ball);
    } else if(ball.x - ball.d / 2 < leftEdge.x1 ){
        new_yspeed = ball.xspeed;
        ball.xspeed = ball.yspeed;
        ball.yspeed = new_yspeed;
        ball.xspeed *= -1;
        ball.leftSound.play();
        activateLine(leftEdge);
        activateBall(ball);
    } else if(ball.y - ball.d / 2 < topEdge.y1) {
        new_xspeed = ball.yspeed;
        ball.yspeed = ball.xspeed;
        ball.xspeed = new_xspeed;
        ball.yspeed *= -1;
        ball.rightSound.play();
        activateLine(topEdge);
        activateBall(ball);
    } else if(ball.y + ball.d / 2 > bottomEdge.y1) {
        new_xspeed = ball.yspeed;
        ball.yspeed = ball.xspeed;
        ball.xspeed = new_xspeed;
        ball.yspeed *= -1;
        ball.leftSound.play();
        activateLine(bottomEdge);
        activateBall(ball);
    }
    
    ball.x+= ball.xspeed;
    ball.y+= ball.yspeed;
}

function preload(){

    sounds.forEach((sound, i) => {
        sounds[i] = loadSound(`sounds/${i}.mp3`)
    })

    console.log(sounds);

    ball1.rightSound = sounds[0];
    ball1.leftSound = sounds[1];
    ball2.rightSound = sounds[2];
    ball2.leftSound = sounds[3];
    ball3.rightSound = sounds[4];
    ball3.leftSound = sounds[5];
    ball4.rightSound = sounds[6];
    ball4.leftSound = sounds[7];
    ball5.rightSound = sounds[0];
    ball5.leftSound = sounds[1];
}

// P5 DISPLAY
function setup(){
    createCanvas(800, 800);
    background(backgroundColor);
}

function draw(){
    background(backgroundColor); // redraw the background each time as well!
    edges.forEach((edge) => {
        drawLine(edge)
    })
    balls.forEach((ball) => {
        displayBall(ball)
        updateBall(ball)
    })
}
