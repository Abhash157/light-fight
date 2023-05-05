
function playerHorVel() {
    if (keys.a.pressed && player.lastKey == 'a' && player.position.x > 0) {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey == 'd' && player.position.x + player.width < cnv.width) {
        player.velocity.x = 5
    }
}
function enemyHorVel() {
    if (keys.arrowL.pressed && enemy.lastKey == 'arrowL' && enemy.position.x > 0) {
        enemy.velocity.x = -5
    } else if (keys.arrowR.pressed && enemy.lastKey == 'arrowR' && enemy.position.x + enemy.width < cnv.width) {
        enemy.velocity.x = 5
    }
}

function gameOver() {
    gameField.style.background = '#00000070'
}
function animate() {
    window.requestAnimationFrame(animate);
    background.update()
    player.update()
    enemy.update()
    player.velocity.x = 0
    enemy.velocity.x = 0

    //  PLAYER KEYS
    if (!player.dead) {
        if (keys.a.pressed && player.lastKey == 'a' && player.position.x > 0) {
            player.velocity.x = -4
            player.switchSprite('run')
        } else if (keys.d.pressed && player.lastKey == 'd' && player.position.x + player.width < cnv.width) {
            player.velocity.x = 4
            player.switchSprite('run')
        } else {
            player.switchSprite('idle')
        }
    }

    // ENEMY KEYS
    if (!enemy.dead) {
        if (keys.arrowL.pressed && enemy.lastKey == 'arrowL' && enemy.position.x > 0) {
            enemy.velocity.x = -5
            enemy.switchSprite('run')
        } else if (keys.arrowR.pressed && enemy.lastKey == 'arrowR' && enemy.position.x + enemy.width < cnv.width) {
            enemy.velocity.x = 5
            enemy.switchSprite('run')
        } else {
            enemy.switchSprite('idle')
        }
    }


    // JUMP ANIMATION
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
        playerHorVel()
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
        playerHorVel()
    }
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
        enemyHorVel()
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
        enemyHorVel()
    }


    // DOUBLE JUMP
    if (player.position.y + player.height > bgHeight - 10) player.jumpCount = 0
    if (enemy.position.y + enemy.height > bgHeight - 10) enemy.jumpCount = 0


    function boxCollision(player1, player2) {
        return player1.attackBox.position.x <= player2.position.x + player2.width &&
            player1.attackBox.position.x + player1.attackBox.width >= player2.position.x &&
            player1.attackBox.position.y <= player2.position.y + player2.height &&
            player1.attackBox.position.y + player1.attackBox.height >= player2.position.y
    }
    function shurikenCollision(player1,player2){
        return player1.shurikenBox.position.x <= player2.position.x + player2.width &&
            player1.shurikenBox.position.x + player1.shurikenBox.width >= player2.position.x &&
            player1.shurikenBox.position.y <= player2.position.y + player2.height &&
            player1.shurikenBox.position.y + player1.shurikenBox.height >= player2.position.y
    }

    //PLAYER ATTACK
    if (boxCollision(player, enemy) && player.isAttacking && player.frameCount == pAtkFrame && player.takingHit == false) {
        if(!player.dead) enemyHealth -= 6
        player.isAttacking = false
        if (enemyHealth <= 0) {
            enemy.switchSprite('death')
        } else {
            enemy.switchSprite('takeHit')
        }
        enemy.takingHit = true
    }
    
    if(shurikenCollision(player, enemy) && player.throwingShuriken){
            enemyHealth -= 10
            if(!enemy.dead) player.shurikenReset()
        }
    if(shurikenCollision(enemy, player) && enemy.throwingShuriken){
            playerHealth -= 10
            enemy.shurikenReset()
        }
    
    if (player.isAttacking && player.frameCount == pAtkFrame) player.isAttacking = false
    if (enemy.takingHit && enemy.frameCount == enemy.sprites.takeHit.totalFrames - 1) enemy.takingHit = false

    //ENEMY ATTACK
    if (boxCollision(enemy, player) && enemy.isAttacking && enemy.frameCount == eAtkFrame && player.takingHit == false) {
        if(!enemy.dead) playerHealth -= 5
        enemy.isAttacking = false
        if (playerHealth <= 0) {
            player.switchSprite('death')
        } else {
            player.switchSprite('takeHit')
        }
        player.takingHit = true
    }
    playerHealthBar.style.width = playerHealth + '%'
    enemyHealthBar.style.width = enemyHealth + '%'
    if (enemy.isAttacking && enemy.frameCount == eAtkFrame) enemy.isAttacking = false
    if (player.takingHit && player.frameCount == player.sprites.takeHit.totalFrames - 1) player.takingHit = false

    // GAME OVER + TIMER
    if (enemyHealth <= 0) {
        gameField.innerHTML = 'Player 1 wins'
        enemyHealthBar.style.width = 0
        enemy.switchSprite('death')
    }
    if (playerHealth <= 0) {
        gameField.innerHTML = 'Player 2 wins'
        playerHealthBar.style.width = 0
        player.switchSprite('death')
    }
    if (playerHealth <= 0 || enemyHealth <= 0) gameOver()

    debug.innerHTML = ' Abhash    ' + player.shurikenDistance + '  ' + player.shurikenBox.position.x
}
animate()
enemy.mirrored = true



// TIMER
let countdown = setInterval(() => {
    if (timer > 0 && !(playerHealth <= 0 || enemyHealth <= 0)) {
        timer--
        if (timer <= 10) {
            timerBox.style.textShadow = '0px 0px 10px rgba(0, 0, 0, 0.634)'
            if (timer % 2 == 0) {
                timerBox.style.background = 'rgb(207, 143, 143)'
                timerBox.style.color = 'red'
            } else {
                timerBox.style.background = 'rgb(159, 192, 163)'
                timerBox.style.color = 'black'
            }
        }
    } else {
        clearInterval('countdown')
        if (enemyHealth == playerHealth) {
            gameField.innerHTML = 'Tie'
            player.switchSprite('death')
            enemy.switchSprite('death')
        } else if (playerHealth > enemyHealth) {
            gameField.innerHTML = 'Player 1 wins'
            enemyHealth = 0
            enemy.switchSprite('death')
        } else if (playerHealth < enemyHealth) {
            gameField.innerHTML = 'Player 2 wins'
            // playerHealthBar.style.width = 0
            playerHealth = 0
            player.switchSprite('death')
        }
        gameOver()
    }
    timerBox.innerHTML = timer
}, 1000)