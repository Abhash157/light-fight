
window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        switch (event.key) {
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                player.mirrored = true
                player.attackBox.offset.x = -190
                player.shurikenBox.offset.x = -160
                break
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                player.mirrored = false
                player.attackBox.offset.x = 70
                player.shurikenBox.offset.x = 200
                break
            case ' ':
                player.attack()
                break
            case 'q':
                player.throwShuriken()
                break
        }
    }
    if (!enemy.dead) {
        switch (event.key) {
            case 'ArrowLeft':
                keys.arrowL.pressed = true
                enemy.lastKey = 'arrowL'
                enemy.mirrored = true
                enemy.attackBox.offset.x = -170
                enemy.shurikenBox.offset.x = -130
                break
            case 'ArrowRight':
                keys.arrowR.pressed = true
                enemy.lastKey = 'arrowR'
                enemy.mirrored = false
                enemy.attackBox.offset.x = 70
                enemy.shurikenBox.offset.x = 160
                break
            case '0':
                enemy.attack()
                break
            case '.':
                enemy.throwShuriken()
                break
        }
    }
})

//KEY UP EVENTS
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break

        case 'ArrowLeft':
            keys.arrowL.pressed = false
            break
        case 'ArrowRight':
            keys.arrowR.pressed = false
            break
        case 'ArrowUp':
            keys.arrowU.pressed = false
            break
    }
})

// JUMP
window.addEventListener('keydown', (event) => {
    if (event.key == 'w' && player.jumpCount < 2 && !player.dead) {
        if (player.jumpCount == 0) {
            player.velocity.y = -17
        } else {
            player.velocity.y = -20
        }
        player.jumpCount++
    }
    if (event.key == 'ArrowUp' && enemy.jumpCount < 2 && !enemy.dead) {
        if (enemy.jumpCount == 0) {
            enemy.velocity.y = -17
        } else {
            enemy.velocity.y = -20
        }
        enemy.jumpCount++
    }
})