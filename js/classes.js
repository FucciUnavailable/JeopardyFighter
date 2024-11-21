//constructing class
class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    maxFrame = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position; //position on canvas
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.maxFrame = maxFrame;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    (this.framesHold = 5), (this.offset = offset);
  }
  draw() {
    if (this.image.complete && this.image.naturalWidth > 0) {
      c.drawImage(
        this.image,
        this.currentFrame * (this.image.width / this.maxFrame),
        0,
        this.image.width / this.maxFrame,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.maxFrame) * this.scale,
        this.image.height * this.scale
      );
    } else {
      console.warn("Image not loaded or in a broken state:", this.image.src);
    }
  }

  animateFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.currentFrame < this.maxFrame - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }
  //we animate the characters
  update() {
    this.draw();
    this.animateFrames();
  }
}

//Fighter class
class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    imageSrc,
    scale = 1,
    maxFrame = 1,
    offset = { x: 0, y: 0 },
    sprites,
  }) {
    super({ position, imageSrc, scale, maxFrame, offset });

    this.velocity = velocity; //movement (speed)
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.attackBox = {
      position: { x: this.position.x, y: this.position.y },
      width: 100,
      height: 50,
      offset,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.sprites = sprites;
    for (let stance in sprites) {
      sprites[stance].image = new Image();
      sprites[stance].image.src = sprites[stance].imageSrc;
    }
  }

  //we animate the characters
  update() {
    this.draw();
    this.animateFrames();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;
    //adding movement to the X position using X speed (velocity)
    this.position.x += this.velocity.x; //current position + movement speed
    this.position.y += this.velocity.y;
    //if the player position taking into account player height and speed is longer than the canvas => stop movement
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  //attack
  attack() {
    this.isAttacking = true;
    //attack pops up for 100ms
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  switchSprites(spr) {
    switch (spr) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          player.maxFrame = player.sprites.idle.maxFrame;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          player.maxFrame = player.sprites.run.maxFrame;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          player.image = player.sprites.jump.image;
          player.maxFrame = player.sprites.jump.maxFrame;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          player.image = player.sprites.fall.image;
          player.maxFrame = player.sprites.fall.maxFrame;
        }
        break;
      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          player.image = player.sprites.takeHit.image;
          player.maxFrame = player.sprites.takeHit.maxFrame;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          player.image = player.sprites.attack1.image;
          player.maxFrame = player.sprites.attack1.maxFrame;
        }
        break;
      case "attack2":
        if (this.image !== this.sprites.attack2.image) {
          player.image = player.sprites.attack2.image;
          player.maxFrame = player.sprites.attack2.maxFrame;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          player.image = player.sprites.death.image;
          player.maxFrame = player.sprites.death.maxFrame;
        }
        break;
    }
  }
}
