let angle=0;
let conjuntoPontos = [];
let limite = 30;

function setup(){
    createCanvas(1280, 680);
    angleMode(DEGREES);
}

function draw(){
    background(0);
    fill(255);
    stroke(200);

    push();
    translate(width/2, height/2);
    rotate(angulo);

    stroke(255);
    fill(255);
    line(0, 0, 100, 100);
    rect(100, 100, 100, 50);

    translate(200, 150);
    rotate(-2*angulo);
    line(0, 0, 200, 200);

    translate(200, 200);
    rotate(1.5 * angulo);
    rect(0, 0, 100, 200);
    meuPonto = point(0, 0);
    if(conjuntoPontos.length < 100){
        conjuntoPontos.push(meuPonto);
    }
    if(conjuntoPontos.length==1){
        console.log(meuPonto);
    }

    translate(100, 200);
    rotate(angulo*7);
    line(0, 0, 60, 60);

    pop();

    for(let i = angulo-360; i<angulo; i+=0.5){
        desenharPonto(i);
    }

    angulo = angulo + 1;
}

function desenharPonto(angulo){
    push();
    translate(width/2, height/2);
    rotate(angulo);

    translate(200, 150);
    rotate(-2*angulo);

    translate(200, 200);
    rotate(1.5 * angulo);

    translate(100, 200);
    rotate(angulo*7);
    translate(60, 60);

    //rotate(100);

    point(0, 0, 3);
    pop();
}

/*
function mouseDragged() {
    let lineHue = mouseX - mouseY;
    stroke(lineHue, 90, 90);
    line(pmouseX, pmouseY, mouseX, mouseY);
    console.log(mouseX, " ", mouseY);
}
*/

function mouseClicked(){
    translate(mouseX, mouseY);
}