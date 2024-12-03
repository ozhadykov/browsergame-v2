import BaseGameElement from "./element.js"
import Game from "./game.js";
import {Collisions} from "../utils/collisions.js";

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
      scale = 0.5,
      animations
    }) {
    super({position, height, width});

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
    this.scale = scale
    this.image = new Image();
    this.image.onload = () => {
      console.log('Player Ready')
    }
    this.image.src =  imageSrc;

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

    // creating event listeners only once, do not need to create them each time, when we re-render
    this.init()
  }

  init() {
    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'd':
          this.keys.d.pressed = true
          this.directionInversion = 1
          break
        case 'a':
          this.keys.a.pressed = true
          this.directionInversion = -1
          break
        case 'w':
          if (!this.keys.w.pressed && this.canJump && !this.inJump) {
            this.startedPressingJump()
            this.inJump = true
            this.keys.w.pressed = true
            this.chargingJumpTime = Date.now()
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
          break
        case 'a':
          this.keys.a.pressed = false
          break
        case 'w':
          // can Jump funktioniert noch nicht mit neuer Collision 
          if (this.canJump && this.inJump) {
            this.animationJump = 0
            this.keys.w.pressed = false
            this.stoppedPressingJump()

            this.jumpDuration = this.endTime - this.startTime
            if(this.jumpDuration <= this.maxJumpCharge) {
            this.velocity.y = -1 * (Math.pow(this.jumpDuration / 375, 2))
            this.velocity.x = this.jumpDuration / 225 * this.directionInversion
            }else {
              this.velocity.y = -1 * (Math.pow(this.maxJumpCharge / 375, 2))
              this.velocity.x = this.maxJumpCharge / 225 * this.directionInversion
            }
            
            this.inJump = false
          }
          break
      }
    })
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
    this.updateHitBox()
    this.checkForHorizontalCollisions()
    this.applyGravity()
    // It is important to use this function 2 times
    this.updateHitBox()
    this.checkForVerticalCollisions()
    this.checkForCollisions()
    this.enableMoving()

  }

  draw(ctx, canvas) {
    ctx.save()
    if (this.walkState) {
      if (this.animationstep <= 8) this.animationstep += 0.1
      else this.animationstep = 0
      this.cropBoxPosition = {x: 100 * Math.round(this.animationstep), y: 0}
    } else if (this.inJump) {
      if (this.animationJump <= 2) this.animationJump += 0.07
      else this.animationJump = 2
      this.cropBoxPosition = {x: 100 * Math.round(this.animationJump), y: 200}
    } else if (this.canJump) {
      this.cropBoxPosition = {x: 0, y: 100}
    } else {
      if (this.animationJump <= 3) this.animationJump = 3
      if (this.animationJump <= 6) this.animationJump += 0.03
      else this.animationJump = 6
      this.cropBoxPosition = {x: 100 * Math.round(this.animationJump), y: 200}
    }
    this.cropBox = {
      height: 100,
      width: 100
    }

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
    } else{
      this.walkState = false;
    }

  }

  checkForHorizontalCollisions() {
    for (const block of this.collisionBlocks) {
      if (Collisions.collision(this.hitBox, block)) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0
          const offset = this.hitBox.position.x - this.position.x + this.hitBox.width
          this.position.x = block.position.x  - offset - 0.01
          break // Exit loop after handling collision
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0
          const offset = this.hitBox.position.x - this.position.x
          this.position.x = block.position.x + offset  + 0.01
          break // Exit loop after handling collision
        }
      }
    }
  }

  checkForVerticalCollisions() {
    for (const block of this.collisionBlocks) {
      if (Collisions.collision(this.hitBox, block)) {
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
      width: 27,
      height: 50,
    }
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
}
