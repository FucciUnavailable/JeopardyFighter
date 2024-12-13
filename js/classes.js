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
    c.save(); // Save the current canvas state
  
   
  // Check if the sprite should face left
  if (this.facing === "leftPlayer") {
    c.translate(this.position.x + this.width * 2 * this.scale, this.position.y); // Translate pivot point
    c.scale(-1, 1); // Flip horizontally
    c.translate(-this.position.x - this.width * this.scale, -this.position.y); // Reset pivot point
  } 
   // Check if the sprite should face left
   if (this.facing === "leftEnemy") {
    c.translate(this.position.x + this.width * 5 * this.scale, this.position.y); // Translate pivot point
    c.scale(-1, 1); // Flip horizontally
    c.translate(-this.position.x - this.width * this.scale, -this.position.y); // Reset pivot point
  } 

  
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
  
    c.restore(); // Restore the canvas state
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
    currentFrame,
    isDead,
    facing
  }) {
    super({ position, imageSrc, scale, maxFrame, offset, currentFrame });

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
    this.isDead = isDead;
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
    //prevent character from spam attack (if character is currently attacking return)
    if (
      this.image === this.sprites.attack1.image &&
      this.currentFrame < this.sprites.attack1.maxFrame - 1
    ) {
      return;
    }
    this.isAttacking = true;
    if (this.isAttacking) {
      this.currentFrame = 0;
      this.switchSprites("attack1");
    }
    //attack pops up for 100ms
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  switchSprites(spr) {
    if (
      this.image === this.sprites.death.image &&
      this.currentFrame < this.sprites.death.maxFrame - 1
    ) {
      this.currentFrame = this.sprites.death.maxFrame - 1;
    }
    if (
      this.image === this.sprites.attack1.image &&
      this.currentFrame < this.sprites.attack1.maxFrame - 1
    ) {
      return;
    }
    if (
      this.image === this.sprites.takeHit.image &&
      this.currentFrame < this.sprites.takeHit.maxFrame - 1
    ) {
      return;
    }

    if (this.image !== this.sprites.death.image) {
      switch (spr) {
        case "idle":
          if (this.image !== this.sprites.idle.image) {
            this.image = this.sprites.idle.image;
            this.maxFrame = this.sprites.idle.maxFrame;
          }
          break;
        case "run":
          if (this.image !== this.sprites.run.image) {
            this.image = this.sprites.run.image;
            this.maxFrame = this.sprites.run.maxFrame;
          }
          break;
        case "jump":
          if (this.image !== this.sprites.jump.image) {
            this.image = this.sprites.jump.image;
            this.maxFrame = this.sprites.jump.maxFrame;
          }
          break;
        case "fall":
          if (this.image !== this.sprites.fall.image) {
            this.image = this.sprites.fall.image;
            this.maxFrame = this.sprites.fall.maxFrame;
          }
          break;
        case "takeHit":
          if (this.image !== this.sprites.takeHit.image) {
            this.image = this.sprites.takeHit.image;
            this.maxFrame = this.sprites.takeHit.maxFrame;
            this.currentFrame = 0;
          }
          break;
        case "attack1":
          if (this.image !== this.sprites.attack1.image) {
            this.image = this.sprites.attack1.image;
            this.maxFrame = this.sprites.attack1.maxFrame;
          }
          break;
        case "attack2":
          if (this.image !== this.sprites.attack2.image) {
            this.image = this.sprites.attack2.image;
            this.maxFrame = this.sprites.attack2.maxFrame;
          }
          break;
        case "death":
          if (this.image !== this.sprites.death.image) {
            this.image = this.sprites.death.image;
            this.maxFrame = this.sprites.death.maxFrame;
          }
          break;
      }
    }
  }
}