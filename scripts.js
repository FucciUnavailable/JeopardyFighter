const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const timer = document.getElementById("timer");
const playerHealth = document.getElementById("playerHealth");
const enemyHealth = document.getElementById("enemyHealth");
canvas.width = 1024;
canvas.height = 576;
const displayText = document.querySelector("#displayText");

c.fillRect(0, 0, canvas.width, canvas.height);

//how fast players fall
const gravity = 0.7;

//background image
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png",
});
//animated shop image
const shop = new Sprite({
  position: { x: 600, y: 160 },
  imageSrc: "./img/shop.png",
  scale: 2.5,
  maxFrame: 6,
});
//player
const player = new Fighter({
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
    x: 215,
    y: 157,
  },
  imageSrc: "/img/samuraiMack/Idle.png",
  maxFrame: 8,
  scale: 2.5,
  sprites: {
    idle: { imageSrc: "/img/samuraiMack/Idle.png", maxFrame: 8 },
    run: { imageSrc: "/img/samuraiMack/Run.png", maxFrame: 8 },
    jump: { imageSrc: "/img/samuraiMack/Jump.png", maxFrame: 2 },
  },
});

const enemy = new Fighter({
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
 /* imageSrc: "./img/kenji/Idle.png",
  maxFrame: 8,
  scale: 2.5, */
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

decreaseTimer();

//animation function
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  player.update();
  enemy.update();

  //make sure player and enemy stop moving when key is up
  player.velocity.x = 0;
  enemy.velocity.x = 0;
  //player.switchSprites("idle");
  //player movement animation
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5; //5fps
    player.switchSprites("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5; //5fps
    player.switchSprites("run");
  }

  //if player is jumping
  if (player.velocity.y < 0) {
    player.switchSprites("jump")
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
    player.isAttacking = false;
    enemy.health -= 5;
    enemyHealth.style.width = enemy.health.toString() + "%";
  }
  //enemy attacks player
  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 5;
    playerHealth.style.width = player.health.toString() + "%";
  }

  //end game when health reaches 0
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
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
