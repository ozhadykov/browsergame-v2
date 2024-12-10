import BaseGameElement from "./element.js"
import Game from "./game.js";

export default class Player extends BaseGameElement {
  constructor(
    {
      position,
      height,
      width,
      imageSrc,
      cropBoxPosition = {x: 0, y: 0},
      gravity = 0.1,
      collisionBlocks,
      scale,
      animations
    }) {
    super({position, height, width, scale});

    this.velocity = {
      x: 0,
      y: 1,
    }
    this.gravity = gravity ?? 0.1;
    this.collisionBlocks = collisionBlocks ?? [];
    this.hitBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    }
    this.cameraBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: Game.getInstance().canvas.width / 2,
      height: Game.getInstance().canvas.height / 2,
    }
    this.scale = scale
    this.image = new Image();
    this.image.onload = () => {
      console.log('Player Ready')
    }
    this.image.src = imageSrc;

    this.keys = {
      d: {
        pressed: false,
      },
      a: {
        pressed: false,
      },
      w: {
        pressed: false,
      },
      pause: { //Escape
        pressed: false,
      },
    };

    this.canJump = true;
    this.inJump = false;
    this.lastPressedRight = false;
    this.jumpDuration = null;
    this.maxJumpCharge = 950; // Einstellungsvariable für Sprung-Limiter
    this.chargingJumpTime = 0;
    this.startTime = null;
    this.endTime = null;

    this.cropBoxPosition = cropBoxPosition;
    this.animationStep = 0;
    this.animationJump = 0;
    this.walkState = false;
    this.directionInversion = 1;

    this.initSounds()

    // creating event listeners only once, do not need to create them each time, when we re-render
    this.initEventListeners()
  }

  initSounds() {
    this.walkSound = new Audio('../assets/Sounds/walkSoud.mp3')
    this.walkSound.preload = "auto";
    this.walkSound.volume = 0.01;
    this.jumpSound = new Audio('../assets/Sounds/jumpSoud.mp3')
    this.jumpSound.preload = "auto";
    this.jumpSound.mozPreservesPitch = false;
    this.jumpSound.volume = 0.01;
    this.crashSound = new Audio('../assets/Sounds/crashSound.mp3')
    this.crashSound.preload = "auto";
    this.crashSound.volume = 0.02;
  }

  initEventListeners() {
    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'd':
          if (!this.inJump) {
            this.keys.d.pressed = true
            this.walkSound.play()
          }
          break
        case 'a':
          if (!this.inJump) {
          this.keys.a.pressed = true
          this.walkSound.play()
          }
          break
        case 'w':
          if (!this.keys.w.pressed && this.canJump && !this.inJump) {
            this.startedPressingJump()
            this.inJump = true
            this.keys.w.pressed = true
            this.chargingJumpTime = Date.now()
            this.jumpSound.pause()
            this.jumpSound.load()
          }
          break
        // todo: move to Game class
        case 'Escape':
          this.keys.pause.pressed = true
          break
      }
    })

    window.addEventListener('keyup', e => {
      switch (e.key) {
        case 'd':
          this.keys.d.pressed = false
          this.walkSound.pause()
          this.walkSound.load()
          break
        case 'a':
          this.keys.a.pressed = false
          this.walkSound.pause()
          this.walkSound.load()
          break
        case 'w':
          // can Jump funktioniert noch nicht mit neuer Collision 
          if (this.canJump && this.inJump) {
            this.animationJump = 0
            this.keys.w.pressed = false
            this.stoppedPressingJump()

            this.jumpDuration = this.endTime - this.startTime
            if(this.jumpDuration >= this.maxJumpCharge) this.jumpDuration = this.maxJumpCharge
            this.velocity.y = -1 * (Math.pow(this.jumpDuration / 350, 2))
            this.velocity.x = this.jumpDuration / 225 * this.directionInversion
            this.playJumpSound()
            this.inJump = false
          }
          break
      }
    })
  }

  playJumpSound() {
    //let soundModulation = Math.random() * (1.3 - 0.7) + 0.7
    let soundModulation =3 - this.jumpDuration / 500
    this.jumpSound.playbackRate = soundModulation;
    this.jumpSound.play()
  }
 

  startedPressingJump() {
    this.startTime = Date.now()
  }

  stoppedPressingJump() {
    this.endTime = Date.now()
  }

  action() {
    this.position.x += this.velocity.x
    // It is important to use this function 2 times
    this.checkDirection()
    this.updateHitBox()
    this.updateHorizontalCamera()
    this.checkForHorizontalCollisions()
    this.applyGravity()
    // It is important to use this function 2 times
    this.updateHitBox()
    this.updateVerticalCamera()
    this.checkForVerticalCollisions()
    this.checkForCollisions()
    this.enableMoving()

  }

  checkDirection() {
    if(this.velocity.x > 0) this.directionInversion = 1
    if(this.velocity.x < 0) this.directionInversion = -1
  }

  draw(ctx, canvas) {
    ctx.save()
    // animation
    this.updateFrames()

    ctx.scale(this.directionInversion, 1);
    ctx.drawImage(
      this.image,
      this.cropBoxPosition.x,
      this.cropBoxPosition.y,
      this.cropBox.width,
      this.cropBox.height,
      this.position.x * this.directionInversion,
      this.position.y,
      this.width * this.directionInversion,
      this.height
    )

    ctx.restore()
  }

  applyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }

  enableMoving() {
    if (this.velocity.x > 0)
      this.velocity.x -= 0.05

    if (this.velocity.x < 0)
      this.velocity.x += 0.05

    if (this.velocity.x < 0.2 && this.velocity.x > -0.2)
      this.velocity.x = 0

    if (this.keys.d.pressed && this.canJump) {
      this.velocity.x = 1;
      this.walkState = true;
    } else if (this.keys.a.pressed && this.canJump) {
      this.velocity.x = -1
      this.walkState = true;
    } else {
      this.walkState = false;
    }

  }

  checkForHorizontalCollisions() {
    for (const block of this.collisionBlocks) {
      if (this.collision(this.hitBox, block)) {
        if (!this.canJump) this.crashSound.play()
        if (this.velocity.x > 0) {
          const offset = this.hitBox.position.x - this.position.x + this.hitBox.width
          this.position.x = block.position.x - offset - 0.01
          if (!this.canJump) this.velocity.x = -1 * this.velocity.x / 1.1
          else this.velocity.x = 0
          break // Exit loop after handling collision
        }

        if (this.velocity.x < 0) {
          const offset = this.hitBox.position.x - this.position.x
          this.position.x = block.position.x + offset + 0.01
          if (!this.canJump) this.velocity.x = -1 * this.velocity.x / 1.1
          else this.velocity.x = 0
          break // Exit loop after handling collision
        }
      }
    }
  }

  checkForVerticalCollisions() {
    for (const block of this.collisionBlocks) {
      if (this.collision(this.hitBox, block)) {
        this.canJump = true
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
          this.position.y = block.position.y - offset - 0.01
          break // Exit loop after handling collision
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0
          const offset = this.hitBox.position.y - this.position.y
          this.position.y = block.position.y + block.height - offset + 0.01
          break // Exit loop after handling collision
        }
      } else
        this.canJump = false
    }
  }

  updateHitBox() {
    this.hitBox = {
      position: {
        x: this.position.x + 8,
        y: this.position.y,
      },
      width: 27 * this.scale,
      height: 50 * this.scale,
    }
  }

  updateFrames() {
    if (this.walkState) {
      if (this.animationstep <= 8) this.animationstep += 0.1
      else this.animationstep = 0
      this.cropBoxPosition = {x: 100 * Math.round(this.animationstep), y: 0}
    } else if (this.inJump) {
      if (this.animationJump <= 2) this.animationJump += 0.07
      else this.animationJump = 2
      this.cropBoxPosition = {x: 100 * Math.round(this.animationJump), y: 201}
    } else if (this.canJump) {
      this.cropBoxPosition = {x: 0, y: 101}
    } else {
      if (this.animationJump <= 3) this.animationJump = 3
      if (this.animationJump <= 6) this.animationJump += 0.03
      else this.animationJump = 6
      this.cropBoxPosition = {x: 100 * Math.round(this.animationJump), y: 201}
    }

    this.cropBox = {
      height: 99,
      width: 100
    }
  }

  updateHorizontalCamera() {
    const canvas = Game.getInstance().canvas

    this.hitBox.position.x + this.hitBox.width >= canvas.width / 2 ?
      this.cameraBox.position.x = - canvas.width / 2 :
      this.cameraBox.position.x = 0
  }

  updateVerticalCamera() {
    this.position.y - 217 >= 0 ?
      this.cameraBox.position.y = this.position.y - 217 :
      this.cameraBox.position.y = 0
  }

  checkForCollisions() {
    const canvas = Game.getInstance().canvas
    // simple checking, because we will use soon something better :)
    // horizontal collision checking
    if (this.position.x + this.velocity.x < 0) {
      this.position.x = 0;
      this.velocity.x = -this.velocity.x
    }

    if (this.position.x + this.width + this.velocity.x > canvas.width) {
      this.velocity.x = -this.velocity.x
      this.position.x = canvas.width - this.width
    }

    if (this.position.x + this.velocity.x < 0) {
      this.position.x = 0;
      this.velocity.x = 0
    }

    if (this.position.x + this.width + this.velocity.x > canvas.width) {
      this.velocity.x = 0
      this.position.x = canvas.width - this.width
    }
  }

  collision(player, block) {
    return (
      player.position.y + player.height >= block.position.y &&
      player.position.y <= block.position.y + block.height &&
      player.position.x <= block.position.x + block.width &&
      player.position.x + player.width >= block.position.x
    )
  }
}
