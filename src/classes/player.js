import { BaseBox, BaseElement } from "../base-classes";
import Game from "../../classes/game.js";

export default class Player2 extends BaseElement {
  constructor(
    {
      x,
      y,
      height,
      width,
      scale,
      imageSrc,
      imageCropBox,
      gravity,
      platformBlocks,
      framesX,
      framesY
    }) {
    super({x, y, height, width, scale, imageSrc, imageCropBox, framesX, framesY});
      
    this.velocity = {
      x: 0,
      y: 1,
    }
    this._velocityX = 0
    this._velocityY = 1

    this.gravity = gravity ?? 0.1;
    this.platformBlocks = platformBlocks ?? [];
    
    this._hitBox = new BaseBox({
        x: this._x,
        y: this._y,
        width: 10,
        height: 10
    })

    const game = Game.getInstance()
    
    this._cameraBox = new BaseBox({
        x: this._x,
        y: this._y,
        width: game.getCanvasManager().getCanvasWidth() / game.getMapScale(),
        height: game.getCanvasManager().getCanvasHeight() / game.getMapScale(),
    })

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

    this.animationStep = 0;
    this.animationJump = 0;
    this.walkState = false;
    this.directionInversion = 1;

    this.initSounds()

    // creating event listeners only once, do not need to create them each time, when we re-render
    this.initEventListeners()

    console.log(this);
    
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
            this._velocityY = -1 * (Math.pow(this.jumpDuration / 350, 2))
            this._velocityX = this.jumpDuration / 225 * this.directionInversion
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
    this._x += this._velocityX
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
    if(this._velocityX > 0) this.directionInversion = 1
    if(this._velocityX < 0) this.directionInversion = -1
  }

  draw(ctx, canvas) {
    ctx.save()
    // animation
    this.updateFrames()

    ctx.scale(this.directionInversion, 1);
    ctx.drawImage(
      this._image,
      this._imageCropBox.getX(),
      this._imageCropBox.getY(),
      this._imageCropBox.getWidth(),
      this._imageCropBox.getHeight(),
      this._x * this.directionInversion,
      this._y,
      this._width * this.directionInversion,
      this._height
    )

    ctx.restore()
  }

  applyGravity() {
    this._velocityY += this.gravity
    this._y += this._velocityY
  }

  enableMoving() {
    if (this._velocityX > 0)
      this._velocityX -= 0.05

    if (this._velocityX < 0)
      this._velocityX += 0.05

    if (this._velocityX < 0.2 && this._velocityX > -0.2)
      this._velocityX = 0

    if (this.keys.d.pressed && this.canJump) {
      this._velocityX = 1;
      this.walkState = true;
    } else if (this.keys.a.pressed && this.canJump) {
      this._velocityX = -1
      this.walkState = true;
    } else {
      this.walkState = false;
    }

  }

  checkForHorizontalCollisions() {
    /**
     * @block is of type BaseElement
     */
    for (const block of this.platformBlocks) {
        if (this._hitBox.isCollidingWith(block)) {
            if (!this.canJump) this.crashSound.play()
            if (this._velocityX > 0) {
                const offset = this._hitBox.getX() - this._x + this._hitBox.getWidth()
                this._x = block.getX() - offset - 0.01
                if (!this.canJump) this._velocityX = -1 * this._velocityX / 1.1
                else this._velocityX = 0
                break // Exit loop after handling collision
            }
    
            if (this._velocityX < 0) {
                const offset = this._hitBox.getX() - this._x
                this._x = block.getX() + offset + 0.01
                if (!this.canJump) this._velocityX = -1 * this._velocityX / 1.1
                else this._velocityX = 0
                break // Exit loop after handling collision
            }
        }
            
    }
  }

  checkForVerticalCollisions() {
    /**
     * @block is of type BaseElement
     */
    for (const block of this.platformBlocks) {
        if (this._hitBox.isCollidingWith(block)){
            this.canJump = true
            if (this._velocityY > 0) {
            this._velocityY = 0
            const offset = this._hitBox.getY() - this._y + this._hitBox.getHeight()
            this._y = block.getY() - offset - 0.01
            break // Exit loop after handling collision
            }

            if (this._velocityY < 0) {
            this._velocityY = 0
            const offset = this._hitBox.getY() - this._y
            this._y = block.getY() + block.getHeight() - offset + 0.01
            break // Exit loop after handling collision
            }
        } else
            this.canJump = false
    }
  }

  updateHitBox() {
    this._hitBox.setX(this._x + 8)
    this._hitBox.setY(this._y)
    this._hitBox.setWidth(27 * this._scale)
    this._hitBox.setHeight(50 * this._scale)
}

  updateFrames() {
    if (this.walkState) {
      if (this.animationstep <= 8) 
        this.animationstep += 0.1
      else 
        this.animationstep = 0
      
        // this.cropBoxPosition = {x: 100 * Math.round(this.animationstep), y: 0}
        this._imageCropBox.setX(100 * Math.round(this.animationstep))
        this._imageCropBox.setY(0)
    } else if (this.inJump) {
      if (this.animationJump <= 2) 
        this.animationJump += 0.07
      else 
        this.animationJump = 2
      
        // this.cropBoxPosition = {x: 100 * Math.round(this.animationJump), y: 201}
        this._imageCropBox.setX(100 * Math.round(this.animationJump))
        this._imageCropBox.setY(201)
    } else if (this.canJump) {
      // this.cropBoxPosition = {x: 0, y: 101}
      this._imageCropBox.setX(0)
      this._imageCropBox.setY(0)
    } else {
      if (this.animationJump <= 3) 
        this.animationJump = 3
      if (this.animationJump <= 6) 
        this.animationJump += 0.03
      else 
      this.animationJump = 6
      
      // this.cropBoxPosition = {x: 100 * Math.round(this.animationJump), y: 201}
      this._imageCropBox.setX(100 * Math.round(this.animationJump))
      this._imageCropBox.setY(201)
    }
  }

  updateHorizontalCamera() {
    const canvas = Game.getInstance().getCanvasManager()

    this._hitBox.getX() + this._hitBox.getWidth() >= canvas.getCanvasWidth() / 2 ?
        this._cameraBox.setX(- canvas.getCanvasWidth() / 2) : 
        this._cameraBox.setX(0)
  }

  updateVerticalCamera() {
    this._y - 217 >= 0 ?
      this._cameraBox.setY(this._y - 217) :
      this._cameraBox.setY(0)
  }

  checkForCollisions() {
    const canvasWidth = Game.getInstance().getCanvasManager().getCanvasWidth()
    // simple checking, because we will use soon something better :)
    // horizontal collision checking
    if (this._x + this._velocityX < 0) {
      this._x = 0;
      this._velocityX = -this._velocityX
    }

    if (this._x + this.width + this._velocityX > canvasWidth) {
      this._velocityX = -this._velocityX
      this._x = canvasWidth - this.width
    }

    if (this._x + this._velocityX < 0) {
      this._x = 0;
      this._velocityX = 0
    }

    if (this._x + this.width + this._velocityX > canvasWidth) {
      this._velocityX = 0
      this._x = canvasWidth - this.width
    }
  }

  getCameraBox() {
    return this._cameraBox
  }
}
