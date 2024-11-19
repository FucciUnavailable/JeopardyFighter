const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const timer = document.getElementById("timer")
const playerHealth = document.getElementById("playerHealth")
const enemyHealth = document.getElementById("enemyHealth")
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

//how fast players fall
const gravity = 0.7;

//constructing class
class Sprite {
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

//player
const player = new Sprite({
  //initial position of main player
  position: {
    x: 0,
    y: 0,
  },
  //initial movement speed of main player
  velocity: {
    x: 0,
    y: 10,
  },
  color: "blue",
  offset: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
  //initial position of enemy
  position: {
    x: 400,
    y: 200,
  },
  //initial speed of movement of enemy
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: 0,
  },
});
//draw enemy and player
player.draw();
enemy.draw();

//creating key object to not interrupt different movements on keyup vs keydown
const keys = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowUp: { pressed: false },
};

//collision function
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  //make sure player and enemy stop moving when key is up
  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement animation
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5; //5fps
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5; //5fps
  }
  //enemy movement animation
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5; //5fps
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5; //5fps
  }

  //detect for attack collision
  //player attacks enemy
  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking
  ) {
    
    console.log("player hit enemy");
    player.isAttacking = false;
    enemy.health -= 5
    enemyHealth.style.width = enemy.health.toString() + "%"
  }
  //enemy attacks player
  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking
   
  ) {
    console.log("enemy hit player");
    enemy.isAttacking = false;
     player.health -=5;
    playerHealth.style.width = player.health.toString() + "%"
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    //player move right
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    //move left
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    //jump
    case "w":
      keys.w.pressed = true;
      //go up by 10
      player.velocity.y = -20;
      player.lastKey = "w";
      break;
    case " ":
      player.attack();
      break;
  }
  switch (event.key) {
    //enemy

    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      //go up by 10
      enemy.velocity.y = -20;
      enemy.lastKey = "ArrowUp";
      break;
    case "ArrowDown":
      enemy.attack();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    //player key up
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
  //enemy key up

  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
