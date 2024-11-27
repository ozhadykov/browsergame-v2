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
      collisionBlocks
    }) {
    super({position, height, width});

    this.velocity = {
      x: 0,
      y: 1,
    };

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
    this.gravity = gravity ?? 0.1;
    this.collisionBlocks = collisionBlocks ?? [];

    this.startTime = null;
    this.endTime = null;

    this.image = new Image();
    this.image.onload = () => {
      console.log('Player Ready')
    }
    this.image.src =  imageSrc;
    // Das ist in Platforms auch weiß nur nicht woher???
    //this.cropBoxPosition = {x: 0, y: 0},
    this.animationStep = 0;
    this.animationJump = 0;
    this.walkState = false;
    this.drectionInversion = 1;

    // creating event listeners only once, do not need to create them each time, when we re-render
    this.init()
  }

  init() {
    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'd':
          this.keys.d.pressed = true,
          this.drectionInversion = 1
          break
        case 'a':
          this.keys.a.pressed = true,
          this.drectionInversion = -1 
          break
        case 'w':
          if (!this.keys.w.pressed && this.canJump && !this.inJump) {
            this.startedPressingJump()
            this.inJump = true
            this.keys.w.pressed = true
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
            this.velocity.y = -2 * (this.jumpDuration * 0.002)

            this.velocity.x = this.jumpDuration * 0.005 * this.drectionInversion
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
    this.checkForHorizontalCollisions()
    this.applyGravity()
    this.checkForVerticalCollisions()
    this.checkForCollisions()

    if (this.velocity.x > 0)
      this.velocity.x -= 0.05

    if (this.velocity.x < 0)
      this.velocity.x += 0.05

    if (this.velocity.x < 0.2 && this.velocity.x > -0.2)
      this.velocity.x = 0

    if (this.keys.d.pressed && this.canJump) {
      this.velocity.x = 0.5;
      this.walkState = true;
    }
    else if (this.keys.a.pressed && this.canJump) {
      this.velocity.x = -0.5
      this.walkState = true;
    } else  this.walkState = false;
  }

  draw(ctx, canvas) {
    ctx.save();
    ctx.scale(1 * this.drectionInversion,1);
    // Bessere version mit CropBox funktioniert nicht siehe Zeile 45
    if (this.walkState) {
      if (this.animationstep <= 8) this.animationstep += 0.1
      else this.animationstep = 0
      this.cropBoxPosition = {x: 80 * Math.round(this.animationstep), y: 0}
    } else if (this.inJump) {
      if (this.animationJump <= 3) this.animationJump += 0.07
      else this.animationJump = 3
      this.cropBoxPosition = {x: 80 * Math.round(this.animationJump), y: 200}
    } else if (this.canJump){
      this.cropBoxPosition = {x: 0, y: 100}
    } else{
      this.cropBoxPosition = {x: 400, y: 200}
    }
    this.cropBox = {
      height: 100,
      width: 60
    }
    
    ctx.drawImage(
      this.image,
      this.cropBoxPosition.x,
      this.cropBoxPosition.y,
      this.cropBox.width,
      this.cropBox.height,
      this.position.x * this.drectionInversion,
      this.position.y,
      this.width * this.drectionInversion,
      this.height
    )
    ctx.restore();
  }

  applyGravity() {
    this.position.y += this.velocity.y
    this.velocity.y += this.gravity
  }

  checkForHorizontalCollisions() {
    for (const block of this.collisionBlocks) {
      if (Collisions.collision(this, block)) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0
          this.position.x = block.position.x - this.width - 0.01
          break // Exit loop after handling collision
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0
          this.position.x = block.position.x + block.width + 0.01
          break // Exit loop after handling collision
        }
      }
    }
  }

  checkForVerticalCollisions() {
    for (const block of this.collisionBlocks) {
      if (Collisions.collision(this, block)) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.position.y = block.position.y - this.height - 0.01
          break // Exit loop after handling collision
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.position.y = block.position.y + block.height + 0.01
          break // Exit loop after handling collision
        }
      }
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
