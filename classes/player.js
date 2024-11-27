import BaseGameElement from "./element.js"
import Game from "./game.js";
import {Collisions} from "../utils/collisions.js";

export default class Player extends BaseGameElement {
  constructor(params) {
    super(params);

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
    this.gravity = params.gravity ?? 0.5;
    this.collisionBlocks = params.collisionBlocks ?? [];

    this.startTime = null;
    this.endTime = null;

    this.image = new Image();
    this.image.onload = () => {
      console.log('Player Ready')
    }
    this.image.src = '../assets/Char/CharSheetWalk.png';
    this.animationStep = 0;
    this.walkState = false;

    // creating event listeners only once, do not need to create them each time, when we re-render
    this.init()
  }

  init() {
    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'd':
          this.keys.d.pressed = true,
            this.lastPressedRight = true
          break
        case 'a':
          this.keys.a.pressed = true,
            this.lastPressedRight = false
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
          if (this.canJump && this.inJump) {
            this.keys.w.pressed = false
            this.stoppedPressingJump()

            this.jumpDuration = this.endTime - this.startTime
            this.velocity.y = -8 * (this.jumpDuration * 0.005)

            if (this.lastPressedRight)
              this.velocity.x = this.jumpDuration * 0.05
            else
              this.velocity.x = -(this.jumpDuration * 0.05)

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
      this.velocity.x -= 0.4

    if (this.velocity.x < 0)
      this.velocity.x += 0.4

    if (this.velocity.x < 0.4 && this.velocity.x > -0.4)
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

    if (this.walkState) {
      if (this.animationstep <= 8) this.animationstep += 0.15
      else this.animationstep = 0
    }
    if (this.lastPressedRight && this.walkState) {
      ctx.save();
      ctx.scale(1,1);
      ctx.drawImage(
        this.image,
        100 * Math.round(this.animationstep),
        0,
        100,
        100,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
      ctx.restore();
    }
    else if (this.walkState) {
      ctx.save();
      ctx.scale(-1,1);
      ctx.drawImage(
        this.image,
        100 * Math.round(this.animationstep),
        0,
        100,
        100,
        -this.position.x,
        this.position.y,
        -this.width,
        this.height
      )
      ctx.restore();
    } else {
      if (this.lastPressedRight) {
        ctx.save();
        ctx.scale(1,1);
        ctx.drawImage(
          this.image,
          0,
          100,
          100,
          100,
          this.position.x,
          this.position.y,
          this.width,
          this.height
        )
        ctx.restore();
      }
      else {
        ctx.save();
        ctx.scale(-1,1);
        ctx.drawImage(
          this.image,
          0,
          100,
          100,
          100,
          -this.position.x,
          this.position.y,
          -this.width,
          this.height
        )
        ctx.restore();
      }
    }
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
