import { BaseElement } from "../base-classes";
import { HitBox } from "./hit-box.js";
import { Sound } from "../base-classes/sound.js"

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
      
    this._velocityX = 0
    this._velocityY = 1

    this._gravity = gravity ?? 0.1;
    this._platformBlocks = platformBlocks ?? [];
    
    this._hitBox = new HitBox({
        x: this._x,
        y: this._y,
        width: 10,
        height: 10
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

    this.sound = new Sound('#sound')
    this.sound.initSound('walkSound', '../src/assets/Sounds/walkSoud.mp3')
    this.sound.initSound('jumpSound', '../src/assets/Sounds/jumpSoud.mp3')
    this.sound.initSound('crashSound', '../src/assets/Sounds/crashSound.mp3')

    // creating event listeners only once, do not need to create them each time, when we re-render
    this.initEventListeners()
    
  }

  initEventListeners() {
    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'd':
          if (!this.inJump) {
            this.keys.d.pressed = true
            this.sound.playSound("walkSound")
          }
          break
        case 'a':
          if (!this.inJump) {
            this.keys.a.pressed = true
            this.sound.playSound("walkSound")
          }
          break
        case 'w':
          if (!this.keys.w.pressed && this.canJump && !this.inJump) {
            this.startedPressingJump()
            this.inJump = true
            this.keys.w.pressed = true
            this.chargingJumpTime = Date.now()
            this.sound.stopSound("jumpSound")
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
          this.sound.stopSound("walkSound")
          break
        case 'a':
          this.keys.a.pressed = false
          this.sound.stopSound("walkSound")
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
            this._velocityX = this.jumpDuration / 225 * this.getDirection()
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
    this.sound.playSound("jumpSound", soundModulation)
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
    this._hitBox.updateHitBox(this)
    this._hitBox.checkForHorizontalCollisions(this)
    this.applyGravity()
    // It is important to use this function 2 times
    this._hitBox.updateHitBox(this)
    this._hitBox.checkForVerticalCollisions(this)
    this.enableMoving()
  }

  checkDirection() {
    if(this._velocityX > 0) this.setDirection(1)
    if(this._velocityX < 0) this.setDirection(-1)
  }
  
  applyGravity() {
    this._velocityY += this._gravity
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


  updateFrames() {
    if (this.walkState) {
      if (this.animationstep <= 8) 
        this.animationstep += 0.15
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
      this._imageCropBox.setY(101)
    } else {
      if (this.animationJump <= 3) 
        this.animationJump = 3
      if (this.animationJump <= 6) 
        this.animationJump += 0.06
      else 
      this.animationJump = 6
      
      // this.cropBoxPosition = {x: 100 * Math.round(this.animationJump), y: 201}
      this._imageCropBox.setX(100 * Math.round(this.animationJump))
      this._imageCropBox.setY(201)
    }
  }

  getPlatformBlocks() {
    return this._platformBlocks
  }

  getCanJump() {
    return this.canJump
  }

  getScale(){
    return this._scale
  }

  getVelocityY() {
    return this._velocityY
  }

  getVelocityX() {
    return this._velocityX
  }

  getHitBox() {
    return this._hitBox
  }

  setCanJump(value) {
    this.canJump = value
  }

  setVelocityY(velocity) {
    this._velocityY = velocity
  }

  setVelocityX(velocity) {
    this._velocityX = velocity
  }
  
}
