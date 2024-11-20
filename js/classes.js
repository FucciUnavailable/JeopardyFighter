//constructing class
class Sprite {
    constructor({ position, imageSrc}) {
      this.position = position; //position on canvas
      this.height = 150;
      this.width = 50;
      this.img = new Image()
      this.img.src = imageSrc
    
    }
    draw() {
     c.drawImage(this.img, this.position.x, this.position.y)
    }
  
    //we animate the characters
    update() {
      this.draw()
  
    } 
  
  }
  
  
  
  //Fighter class
  class Fighter {
    constructor({ position, velocity, color = "red", offset }) {
      this.position = position; //position on canvas
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
      this.health= 100;
    }
    draw() {
      //draw characters
      c.fillStyle = this.color;
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
      //attack box draw
      if (this.isAttacking) {
        c.fillStyle = "green";
        c.fillRect(
          this.attackBox.position.x,
          this.attackBox.position.y,
          this.attackBox.width,
          this.attackBox.height
        );
      }
    }
  
    //we animate the characters
    update() {
      this.draw();
      this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
      this.attackBox.position.y = this.position.y;
      //adding movement to the X position using X speed (velocity)
      this.position.x += this.velocity.x; //current position + movement speed
      this.position.y += this.velocity.y;
      //if the player position taking into account player height and speed is longer than the canvas => stop movement
      if (this.position.y + this.height + this.velocity.y >= canvas.height) {
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
  }