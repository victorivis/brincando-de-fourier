let angulo=0;
let listaCirculos = [];
let listaPontos = [];
let limitePontos = 30 ;

//Sliders para teste
let meuSlider;
let numeroDePontos;
let numeroDeCirculos;
let proporcaoDosCirculos;
let espacamentoPontos;

function setup(){
    frameRate(60);
    createCanvas(1280, 680);
    meuSlider = createSlider(1, 10, 6, 1);
    meuSlider.position(width*0.88, 20);

    numeroDePontos = createSlider(1, 9000, 1, 1);
    numeroDePontos.position(width*0.88, 100);

    numeroDeCirculos = createSlider(1, 15, 1, 1);;
    numeroDeCirculos.position(width*0.88, 180);

    proporcaoDosCirculos = createSlider(0.1, 4, 2, 0.1);;
    proporcaoDosCirculos.position(width*0.88, 260);

    espacamentoPontos = createSlider(1, 50, 5, 1);;
    espacamentoPontos.position(width*0.88, 340);

    angleMode(DEGREES);
    //angleMode(RADIANS);

    for(let i=1; i<10; i++){
        listaCirculos.push({r:tamanhoCirculo(i), v:10.0/tamanhoCirculo(i)});
    }

    console.log(meuSlider); 
}

function draw(){
    background(0);
    fill(255);
    stroke(200);

    
    translate(width/4, height/2);
    push();

    while(listaCirculos.length < numeroDeCirculos.value()){
        const tamanho = listaCirculos.length+1;
        listaCirculos.push({r:tamanhoCirculo(tamanho), v:10.0/tamanhoCirculo(tamanho)});
    }
    while(listaCirculos.length > numeroDeCirculos.value()){
        listaCirculos.pop();
    }

    //desenharRastro(listaCirculos, angle);

    noFill();
    for(let i=0; i<listaCirculos.length; i++){
        //rotate(10*angle/tamanhoCirculo(i));
        //console.log(testePontos[i].v * angle);
        rotate(listaCirculos[i].v * angulo);
        circle(0, 0, listaCirculos[i].r);
        line(0, 0, 0, listaCirculos[i].r/2);        
        translate(0, listaCirculos[i].r/2);
    }
    pop();


    push();

    stroke(255, 0, 0);
    const novoX = cos( angulo * listaCirculos[0].v + 90) * listaCirculos[0].r/2;
    const novoY = sin( angulo * listaCirculos[0].v + 90) * listaCirculos[0].r/2;
    //console.log(novoX, " ", novoY);
    listaPontos.push({x:novoX, y:novoY});

    

    for(let i=0; i<listaPontos.length; i++){
        ellipse(listaPontos[i].x, listaPontos[i].y, 5);
        //point(listaPontos[i].x, listaPontos[i].y);
    }

    while(listaPontos.length > limitePontos){
        listaPontos.shift();
    }

    pop();

    //for(let i = angle-360; i<angle; i+=0.5){
    //    desenharPonto(i);
    //}

    
    angulo += meuSlider.value();

    fill(255);
    stroke(200);
    text("Velocidade: " + meuSlider.value(), meuSlider.x, meuSlider.y+30);
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