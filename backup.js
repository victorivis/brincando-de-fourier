let angulo=0;
let listaCirculos = [];
let listaPontos = [];
let limitePontos = 1000;
let pausar = false;

//Sliders para teste
let meuSlider;
let numeroDePontos;
let numeroDeCirculos;
let proporcaoDosCirculos;
let espacamentoPontos;

let botaoModoExibicao;
let mostrarPoligono=true;

let checkBoxes=[];

function setup(){
    const posicaoX = 0.85;

    frameRate(60);
    createCanvas(1280, 680);
    meuSlider = createSlider(1, 400, 30, 1);
    meuSlider.position(width*posicaoX, 20);

    numeroDePontos = createSlider(1, 10**7, 10**6, 1);
    numeroDePontos.position(width*posicaoX, 100);

    numeroDeCirculos = createSlider(1, 15, 4, 1);;
    numeroDeCirculos.position(width*posicaoX, 180);

    proporcaoDosCirculos = createSlider(0.1, 4, 2.01, 0.01);;
    proporcaoDosCirculos.position(width*posicaoX, 260);

    espacamentoPontos = createSlider(1, 50, 5, 1);;
    espacamentoPontos.position(width*posicaoX, 340);

    botaoModoExibicao = createButton("Trocar modo de exibição");
    botaoModoExibicao.mouseClicked(trocarExibicao);
    botaoModoExibicao.position(width*posicaoX, 600);

    angleMode(DEGREES);

    for(let i=1; i<10; i++){
        listaCirculos.push({r:tamanhoCirculo(i), v:10.0/tamanhoCirculo(i)});
    }

    console.log(meuSlider);
    for(let i=0; i<2; i++){
        console.log(listaCirculos[i]);
    }
}

function draw(){
    let limitePontos = numeroDePontos.value();
    //if(pausar){
    //    return;
    //}
    //else{
    //    pausar = true;
    //}

    background(0);
    fill(255);
    stroke(200);

    while(checkBoxes.length < numeroDeCirculos.value()){    
        const atual = checkBoxes.length;
        checkBoxes.push(createCheckbox("", true));
        checkBoxes[atual].position(width*0.85 + 30*(atual%5), 470 + 30*parseInt(atual/5));

        //console.log(checkBoxes[i]); 
    }
    while(checkBoxes.length > numeroDeCirculos.value()){
        checkBoxes[checkBoxes.length-1].remove();
        checkBoxes.pop();
    }

    push();
    translate(width/4, height/2);

    while(listaCirculos.length < numeroDeCirculos.value()){
        const tamanho = listaCirculos.length+1;
        listaCirculos.push({r:tamanhoCirculo(tamanho), v:10.0/tamanhoCirculo(tamanho)});
    }
    while(listaCirculos.length > numeroDeCirculos.value()){
        listaCirculos.pop();
    }

    //desenharRastro(listaCirculos, angulo);

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
    translate(width/4, height/2);

    let novoX=0;
    let novoY=0;

    let velocidadeAnterior=0;

    for(let i=0; i<listaCirculos.length; i++){
        velocidadeAnterior+=listaCirculos[i].v;

        let conserta = 0;
        if(true){
            conserta = 0;
        }

        novoX += sin( -angulo * (velocidadeAnterior)) * listaCirculos[i].r/2;
        novoY += cos( -angulo * (velocidadeAnterior)) * listaCirculos[i].r/2;
        listaPontos.push({x: novoX, y: novoY, posicao: i});
    }
    

    while(listaPontos.length > limitePontos){
        listaPontos.shift();
    }

    noFill();
    
    for(let j=0; j<listaCirculos.length; j++){
        if(checkBoxes[j].checked()){
            const proporacaoDaCor = 255.0 * (j+1)/listaCirculos.length;
            stroke( proporacaoDaCor, (120+proporacaoDaCor)%255, (255-proporacaoDaCor) );

            //Exibe linhas
            if(mostrarPoligono){
                beginShape();
                for(let i=0; i<listaPontos.length; i++){

                    if(listaPontos[i].posicao == j){
                        vertex(listaPontos[i].x, listaPontos[i].y);
                        //point(listaPontos[i].x, listaPontos[i].y);
                    }
                    
                }
                endShape();
            }

            //Exibe pontilhado
            else{
                for(let i=0; i<listaPontos.length; i++){
                    if(listaPontos[i].posicao == j){
                        point(listaPontos[i].x, listaPontos[i].y);
                    }                  
                }
            }
        }
    }

    pop();

    //for(let i = angle-360; i<angle; i+=0.5){
    //    desenharPonto(i);
    //}

    angulo += meuSlider.value();
    text("Escala: " + meuSlider.value(), meuSlider.x, meuSlider.y+30);
    text("Numero de Pontos: " + numeroDePontos.value(), numeroDePontos.x, numeroDePontos.y+30);
    text("Numero de Circulos: " + numeroDeCirculos.value(), numeroDeCirculos.x, numeroDeCirculos.y+30);
    text("Proporcao dos circulos: " + proporcaoDosCirculos.value(), proporcaoDosCirculos.x, proporcaoDosCirculos.y+30);
    text("Espaçamento pontos: " + espacamentoPontos.value(), espacamentoPontos.x, espacamentoPontos.y+30);
    text("Visualizar Circulos", espacamentoPontos.x, 450);
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

function trocarExibicao(){
    mostrarPoligono = !mostrarPoligono;
}