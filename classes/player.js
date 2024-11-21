import BaseGameElement from "./element.js"

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

    this.startTime = null;
    this.endTime = null;

    // creating event listeners only once, do not need to create them each time, when we re-render
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
    if (this.velocity.x > 0)
      this.velocity.x -= 0.2

    if (this.velocity.x < 0)
      this.velocity.x += 0.2

    if (this.velocity.x < 0.2 && this.velocity.x > -0.2)
      this.velocity.x = 0

    if (this.keys.d.pressed && this.canJump)
      this.velocity.x = 5
    else if (this.keys.a.pressed && this.canJump)
      this.velocity.x = -5
  }

  checkForCollisions(ctx, canvas) {
    // simple checking, because we will use soon something better :)
    if (this.position.y + this.height + this.velocity.y > canvas.height) {
      this.velocity.y = 0
      this.canJump = true
    } else
      this.canJump = false

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

  checkForPlatformCollisions() {
    const playerBottom = this.position.y + this.height;
    const playerTop = this.position.y;
    const playerRight = this.position.x + this.width;
    const playerLeft = this.position.x;
    var verticalCollision = false
    var horizontalCollision = false;


    for (let i = 0; i < this.elementList.length; i++) {
      const element = this.elementList[i];

      // Ignoriere das eigene Element (den Spieler)
      if (element === this) continue;

      // Prüfe, ob es sich um eine Plattform handelt
      if (element instanceof Platform) {
        const platformBottom = element.position.y + element.height;
        const platformTop = element.position.y;
        const platformRight = element.position.x + element.width;
        const platformLeft = element.position.x;

        //Vertikale Kollision:
        if (playerBottom >= platformTop && playerTop <= platformBottom && playerLeft <= platformRight && playerRight >= platformLeft) { //y-achse
          verticalCollision = true

        }

        //Horizontale Kollision:
        if (playerBottom >= platformTop && playerTop <= platformBottom && playerLeft <= platformRight && playerRight >= platformLeft)
          verticalCollision = true
      }


      //player movement anapassen:
      if (verticalCollision) {
        if (this.velocity.y > 0) {
          console.log("vertikale kollision!");
          this.velocity.y = 0
          this.position.y = element.position.y - this.height - 0.01
        }
        if (this.velocity.y < 0) {
          console.log("vertikale kollision!");
          this.velocity.y = 0
          this.position.y = platformBottom + 0.01

        }
      }

      if (horizontalCollision) {
        if (this.velocity.x > 0) {
          console.log("horizontale kollision!");
          this.velocity.x = 0
          this.position.x = element.position.x - this.width - 0.01
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0
          this.position.x = platformRight + 0.01
        }
      }
    }
  }


  draw(ctx, canvas) {

    ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'

    if (this.lastPressedRight)
      ctx.fillRect(this.position.x + (this.width - 2 * (this.width / 5)), this.position.y + this.height / 5, this.width / 5, this.height / 5)
    else
      ctx.fillRect(this.position.x + this.width / 5, this.position.y + this.height / 5, this.width / 5, this.height / 5)


    this.position.x += this.velocity.x

    this.applyGravity()
    this.checkForCollisions(ctx, canvas)

    //this.checkForPlatformCollisions()
  }

  applyGravity() {
    this.position.y += this.velocity.y
    this.velocity.y += this.gravity
  }
}
