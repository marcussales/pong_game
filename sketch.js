let bolaImagem;
let jogadorImagem1;
let jogadorImagem2;
let fundoImagem;


class Raquete {
    constructor(x) {
        this.x = x;
        this.w = 10;
        this.h = 60;
        this.y = height / 2;
    }

    update() {
        if (this.x < width / 2) {
            this.y = mouseY;
        } else {
            if (bola.y < this.y) {
                this.y -= 3;
            } else {
                this.y += 3;
            }
        }


        if (this.y > height - this.h) {
            this.y = height - this.h;
        }
    }

    draw() {
        if (this.x < width / 2) {
            image(jogadorImagem1, this.x, this.y, this.w, this.h);
        } else {
            image(jogadorImagem2, this.x, this.y, this.w, this.h);
        }
    }
}

class Bola {
    constructor() {
        this.r = 25;
        this.reset();
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        const velocidadeMax = 5;

        this.vx = velocidadeMax * 2 - 2.5;
        this.vy = Math.random() * 2 - 2.5;

    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < this.r || this.x > width - this.r) {
            this.reset();
        }
        if (this.y < this.r || this.y > height - this.r) {
            this.vy *= -1;
        }

        const raqueteCollision = (this.x - this.r < 30 && this.y > raquete.y && this.y < raquete.y + raquete.h);
        const computadorCollision = (this.x + this.r > width - 30 && this.y > computador.y && this.y < computador.y + computador.h);

        if (raqueteCollision || computadorCollision) {
            this.vx *= -1;
            this.vx *= 1.1;
            this.vy *= 1.1;
        }
    }

    draw() {
        //rotacionar a imagem da bola
        push();
        translate(this.x, this.y);
        rotate(frameCount / 50.0);
        image(bolaImagem, -this.r, -this.r, this.r * 2, this.r * 2);
        pop();
    }
}

let bola;
let raquete;
let computador;

function checkCollision() {
    if (bola.x < 30 && bola.y > raquete.y && bola.y < raquete.y + raquete.h) {
        bola.vx *= -1;
    }
    if (bola.x > width - 30 && bola.y > computador.y && bola.y < computador.y + computador.h) {
        bola.vx *= -1;
    }
}

function preload() {
    bolaImagem = loadImage('bola.png');
    jogadorImagem1 = loadImage('barra01.png');
    jogadorImagem2 = loadImage('barra02.png');
    fundoImagem = loadImage('fundo2.png');

}

function setup() {
    createCanvas(1200, 600);
    raquete = new Raquete(30);
    computador = new Raquete(width - 40);
    bola = new Bola();
}

function draw() {
    image(fundoImagem, width / 2 - fundoImagem.width / 2, height / 2 - fundoImagem.height / 2);
    raquete.update();
    raquete.draw();
    computador.update();
    computador.draw();
    bola.update();
    bola.draw();
}