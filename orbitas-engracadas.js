let angle=0;
let conjuntoPontos = [{r:200, v:1}, {r:105, v:2}];
let testePontos = []
let limite = 30;
let meuSlider;

function setup(){
    createCanvas(1280, 680);
    meuSlider = createSlider(1, 10, 1, 1);
    meuSlider.position(width*0.88, 20);
    angleMode(DEGREES);

    for(let i=1; i<10; i++){
        testePontos.push({r:tamanhoCirculo(i), v:10.0/tamanhoCirculo(i)});
    }

    console.log(meuSlider); 
}

function draw(){
    background(0);
    fill(255);
    stroke(200);

    push();
    translate(width/4, height/2);

    desenharRastro(testePontos, angle);

    noFill();
    for(let i=1; i<10; i++){
        rotate(10*angle/tamanhoCirculo(i));
        circle(0, 0, tamanhoCirculo(i));
        line(0, 0, 0, tamanhoCirculo(i)/2);

        
        translate(0, tamanhoCirculo(i)/2);
    }
    

    

    pop();

    //for(let i = angle-360; i<angle; i+=0.5){
    //    desenharPonto(i);
    //}

    angle += 1;
    text("Escala: " + meuSlider.value(), meuSlider.x, meuSlider.y+30);
}

function desenharPonto(angulo){
    //translate(100, 0);
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

function mouseClicked(){
    translate(mouseX, mouseY);
}

function tamanhoCirculo(numero){
    return 500.0/2**numero;
}

function desenharRastro(lista, angulo){
    for(let i=0; i<lista.length; i++){
        push();

        for(let j=angulo-40; j<angulo; j+=0.5){
            rotate( j * lista[i].v);
            translate(0, lista[i].r/2);
        }

        fill(255);
        stroke(200);

        ellipse(0, 0, 5);
        //point(0, 0);

        pop();
    }
}