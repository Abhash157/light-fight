const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/environment.png',
    scale: 2.1
})
const player = new fighter({
    position: {
        x: 300,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: './img/Player1/idle.png',
    scale: 2.5,
    totalFrames: 8,
    offset: {
        x: 215,
        y: 150
    },
    shuriken: {
        imageSrc: ''
    },
    sprites: {
        idle: {
            imageSrc: './img/Player1/idle.png',
            totalFrames: 8
        },
        run: {
            imageSrc: './img/Player1/run.png',
            totalFrames: 8
        },
        jump: {
            imageSrc: './img/Player1/jump.png',
            totalFrames: 2
        },
        fall: {
            imageSrc: './img/Player1/fall.png',
            totalFrames: 2
        },
        attack1: {
            imageSrc: './img/Player1/attack1.png',
            totalFrames: 6
        },
        shurikenatk: {
            imageSrc: './img/Player1/attack2.png',
            totalFrames: 6
        },
        takeHit: {
            imageSrc: './img/Player1/takeHit.png',
            totalFrames: 4
        }, 
        death: {
            imageSrc: './img/Player1/death.png',
            totalFrames: 6
        }
    },
    attackBox: {
        offset: {
            x: 70,
            y: 30
        },
        width: 170,
        height: 50
    },
    shurikenBox: {
        offset: {
            x: 200,
            y: 55
        }
    },
    atkFrame: 4
})

const enemy = new fighter({
    position: {
        x: 800,
        y: 0
    },
    width: 30,
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: './img/player2/idle.png',
    scale: 2.2,
    totalFrames: 4,
    offset: {
        x: 215,
        y: 130
    },
    shuriken: {
        imageSrc: ''
    },
    sprites: {
        idle: {
            imageSrc: './img/Player2/idle.png',
            totalFrames: 4
        },
        run: {
            imageSrc: './img/Player2/run.png',
            totalFrames: 8
        },
        jump: {
            imageSrc: './img/Player2/jump.png',
            totalFrames: 2
        },
        fall: {
            imageSrc: './img/Player2/fall.png',
            totalFrames: 2
        },
        attack1: {
            imageSrc: './img/Player2/attack1.png',
            totalFrames: 4
        },
        shurikenatk: {
            imageSrc: './img/Player2/attack2.png',
            totalFrames: 4
        },
        takeHit: {
            imageSrc: './img/Player2/takeHit.png',
            totalFrames: 3
        },
        death: {
            imageSrc: './img/Player2/death.png',
            totalFrames: 7
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 30
        },
        width: 140,
        height: 50
    },
    shurikenBox: {
        offset: {
            x: -130,
            y: 55
        }
    },
    atkFrame: 2
})