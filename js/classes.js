class Sprite {
    constructor({ position, imageSrc, scale = 1, frameCount = 0, totalFrames = 1, framesElapsed = 0, offset = { x: 0, y: 0 } }) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.frameCount = frameCount
        this.totalFrames = totalFrames
        this.offset = offset;
        this.framesElapsed = framesElapsed
    }
    draw() {
        if (this.mirrored) {
            c.save()
            c.scale(-1, 1);
            c.translate(-cnv.width, 0);
            c.drawImage(
                this.image,
                this.frameCount * (this.image.width / this.totalFrames),
                0,
                this.image.width / this.totalFrames,
                this.image.height,
                -this.position.x + this.offset.x + cnv.width / 2 + (this.image.width / this.totalFrames) - this.width / 2,
                this.position.y - this.offset.y,
                (this.image.width / this.totalFrames) * this.scale,
                this.image.height * this.scale
            )
            c.restore()
        } else {
            c.drawImage(
                this.image,
                this.frameCount * (this.image.width / this.totalFrames),
                0,
                this.image.width / this.totalFrames,
                this.image.height,
                this.position.x - this.offset.x,
                this.position.y - this.offset.y,
                (this.image.width / this.totalFrames) * this.scale,
                this.image.height * this.scale
            )
        }
    }
    animate() {
        if (this.framesElapsed == 4) {
            if (this.frameCount < this.totalFrames - 1) {
                this.frameCount++
            } else {
                this.frameCount = 0
            }
            this.framesElapsed = 0
        }
        this.framesElapsed++

    }
    update() {
        this.draw()
        this.animate()
    }
}
class fighter extends Sprite {
    constructor({ position, velocity,width = 50,
        imageSrc, scale = 1,
        frameCount = 0,
        totalFrames,
        framesElapsed = 0,
        offset = { x: 0, y: 0 },
        sprites,
        attackBox = { offset: {}, width: undefined, height: undefined },
        shuriken,
        shurikenBox = { offset: {} },
        atkFrame
    }) {
        super({
            position,
            imageSrc,
            scale,
            frameCount,
            totalFrames,
            framesElapsed,
            offset
        })
        this.velocity = velocity;
        this.height = 150;
        this.width = width;
        this.lastKey;
        this.jumpCount = 0;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        },
            this.atkFrame = atkFrame
        offset,
            this.isAttacking;
        this.shurikenBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: {
                x: shurikenBox.offset.x,
                y: shurikenBox.offset.y
            },
            width: 20,
            height: 50
        }
        this.sprites = sprites
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        this.shuriken = shuriken
        this.shuriken.image = new Image()
        this.shurikenActivated = false
        this.throwingShuriken = false
        this.shurikenL = true
        this.shurikenDistance = 0
        this.mirrored = false
        this.takingHit = false
        this.dead = false
    }
    update() {
        this.draw()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        if (!this.throwingShuriken) {
            this.shurikenBox.position.x = this.position.x + this.shurikenBox.offset.x + this.shurikenDistance
            this.shurikenBox.position.y = this.position.y + this.shurikenBox.offset.y
        }
        this.shuriken.image.src = this.shuriken.imageSrc

        //DRAW SHURIKEN
        c.drawImage(
            this.shuriken.image,
            this.shurikenBox.position.x - this.shurikenBox.width,
            this.shurikenBox.position.y,
            50,
            50
        )
        // BOX VISUAL
        // c.fillStyle = 'red'
        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // c.fillStyle = 'white'
        // c.fillRect(this.shurikenBox.position.x, this.shurikenBox.position.y, this.shurikenBox.width, this.shurikenBox.height)

        // POSITION
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        
        // GROUND + GRAVITY
        if (this.position.y + this.height + this.velocity.y >= bgHeight) {
            this.velocity.y = 0;
            this.position.y = 380;
        } else {
            this.velocity.y += gravity;
        }

        //ATTACK + SHURIKEN
        if (this.isAttacking && this.frameCount == this.atkFrame + 1) this.isAttacking = false
        if (this.shurikenActivated && this.frameCount == this.atkFrame && this.image == this.sprites.shurikenatk.image) {
            this.throwingShuriken = true
            this.shurikenActivated = false
        }
        if (!this.throwingShuriken) {
            if (this.mirrored) this.shurikenL = true
            else this.shurikenL = false
        }
        if (this.throwingShuriken) {
            if (this.shurikenL) this.shurikenBox.position.x -= 25
            else this.shurikenBox.position.x += 25
            this.shuriken.imageSrc = './img/bg.jpeg'
        }
        if (this.shurikenBox.position.x > cnv.width ||
            this.shurikenBox.position.x + this.shurikenBox.width < 0
        ) {
            this.shurikenReset()
        }

        //DEAD
        if (!this.dead) this.animate()
    }
    attack() {
        if (!this.takingHit) {
            this.isAttacking = true
            this.switchSprite('attack1')
        }
    }
    throwShuriken() {
        if (!this.throwingShuriken) {
            this.switchSprite('shurikenatk')
            this.shurikenActivated = true
        }
    }
    shurikenReset() {
        this.shurikenDistance = 0
        this.throwingShuriken = false
        this.shuriken.imageSrc = ''
    }

    switchSprite(sprite) {

        if (this.image === this.sprites.death.image) {
            if (this.frameCount == this.sprites.death.totalFrames - 1) this.dead = true
            return
        }
        if (this.image === this.sprites.takeHit.image && this.frameCount < this.sprites.takeHit.totalFrames - 1) return
        if (this.image === this.sprites.attack1.image && this.frameCount < this.sprites.attack1.totalFrames - 1) return
        if (this.image === this.sprites.shurikenatk.image && this.frameCount < this.sprites.shurikenatk.totalFrames - 1) return

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.totalFrames = this.sprites.idle.totalFrames
                    this.frameCount = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.totalFrames = this.sprites.run.totalFrames
                    this.frameCount = 0

                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.totalFrames = this.sprites.jump.totalFrames
                    this.frameCount = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.totalFrames = this.sprites.fall.totalFrames
                    this.frameCount = 0
                }
                break
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.totalFrames = this.sprites.attack1.totalFrames
                    this.frameCount = 0
                }
                break
            case 'shurikenatk':
                if (this.image !== this.sprites.shurikenatk.image) {
                    this.image = this.sprites.shurikenatk.image
                    this.totalFrames = this.sprites.shurikenatk.totalFrames
                    this.frameCount = 0
                }
                break
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.totalFrames = this.sprites.takeHit.totalFrames
                    this.frameCount = 0
                }
                break
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.totalFrames = this.sprites.death.totalFrames
                    this.frameCount = 0
                }
                break

        }
    }
}
