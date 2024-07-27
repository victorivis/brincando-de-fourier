let angle=0;
let conjuntoPontos = [{r:200, v:1}, {r:105, v:2}];
let testePontos = []
let limite = 30;

//Sliders para teste
let meuSlider;
let numeroDePontos;
let numeroDeCirculos;
let proporcaoDosCirculos;
let espacamentoPontos;

function setup(){
    frameRate(10);
    createCanvas(1280, 680);
    meuSlider = createSlider(1, 10, 1, 1);
    meuSlider.position(width*0.88, 20);

    numeroDePontos = createSlider(1, 9000, 1000, 1);
    numeroDePontos.position(width*0.88, 100);

    numeroDeCirculos = createSlider(1, 15, 5, 1);;
    numeroDeCirculos.position(width*0.88, 180);

    proporcaoDosCirculos = createSlider(0.1, 4, 2, 0.1);;
    proporcaoDosCirculos.position(width*0.88, 260);

    espacamentoPontos = createSlider(1, 50, 5, 1);;
    espacamentoPontos.position(width*0.88, 340);

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

    while(testePontos.length < numeroDeCirculos.value()){
        const tamanho = testePontos.length+1;
        testePontos.push({r:tamanhoCirculo(tamanho), v:10.0/tamanhoCirculo(tamanho)});
    }
    while(testePontos.length > numeroDeCirculos.value()){
        testePontos.pop();
    }

    desenharRastro(testePontos, angle);

    noFill();
    for(let i=0; i<testePontos.length; i++){
        //rotate(10*angle/tamanhoCirculo(i));
        //console.log(testePontos[i].v * angle);
        rotate(testePontos[i].v * angle);
        circle(0, 0, testePontos[i].r);
        line(0, 0, 0, testePontos[i].r/2);        
        translate(0, testePontos[i].r/2);
    }
    

    

    pop();

    //for(let i = angle-360; i<angle; i+=0.5){
    //    desenharPonto(i);
    //}

    angle += meuSlider.value();
    text("Escala: " + meuSlider.value(), meuSlider.x, meuSlider.y+30);
    text("Numero de Pontos: " + numeroDePontos.value(), numeroDePontos.x, numeroDePontos.y+30);
    text("Numero de Circulos: " + numeroDeCirculos.value(), numeroDeCirculos.x, numeroDeCirculos.y+30);
    text("Proporcao dos circulos: " + proporcaoDosCirculos.value(), proporcaoDosCirculos.x, proporcaoDosCirculos.y+30);
    text("Espaçamento pontos: " + espacamentoPontos.value(), espacamentoPontos.x, espacamentoPontos.y+30);
    
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
    return 500.0/proporcaoDosCirculos.value()**numero;
}

function desenharRastro(lista, angulo){
    const espacamento=espacamentoPontos.value();
    const inicio = angulo - espacamento*numeroDePontos.value();

    for(let j=inicio; j<=angulo; j+=espacamento){
        push();

        for(let i=0; i<lista.length; i++){
            rotate( j * lista[i].v);
            translate(0, lista[i].r/2);
        }
        fill(255);
        stroke(200);

        //ellipse(0, 0, 1 );
        point(0, 0);

        pop();
    }
}