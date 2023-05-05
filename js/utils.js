function log(con) {
    console.log(con)
}
function ryt(con) {
    document.write(con)
}

let debug = document.getElementById('debug')
let cnv = document.querySelector('canvas')
let c = cnv.getContext('2d')
let gameField = document.getElementById('gameField')
let gravity = 0.98;
let lastKey;
let keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },

    arrowL: {
        pressed: false
    },
    arrowR: {
        pressed: false
    },
    arrowU: {
        pressed: false
    }
}
let health = document.getElementsByClassName('healthBar')
let timerBox = document.getElementsByClassName('timer')[0]
let timer = 60
let enemyHealthBar = health[1]
let playerHealthBar = health[0]
let enemyHealth = 100
let playerHealth = 100
let pAtkFrame = 4
let eAtkFrame = 2
cnv.width = 1280;
cnv.height = 600;
let bgHeight = 530;
c.fillRect(0, 0, cnv.width, cnv.height)