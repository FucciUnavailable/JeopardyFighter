const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const timer = document.getElementById("timer");
const playerHealth = document.getElementById("playerHealth");
const enemyHealth = document.getElementById("enemyHealth");
canvas.style.width = "100%";
canvas.style.height = "auto";

const displayText = document.querySelector("#displayText");
const triggerAi = document.querySelector("#triggerAi")  ;
const healthAndTimer = document.querySelector("#healthAndTimer")
// Get the mode from the URL
const urlParams = new URLSearchParams(window.location.search);
const gameMode = urlParams.get("mode"); // 'ai' or 'player'




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
//player character constructor
const player = new Fighter({
  //initial position of main player
  position: {
    x: -50,
    y: 0,
  },
  //initial movement speed of main player
  velocity: {
    x: 0,
    y: 10,
  },
  color: "blue",

  offset: {
    x: 30,
    y: 157,
  },
  maxFrame: 8,
  scale: 2.5,
  sprites: {
    idle: { imageSrc: "./img/samuraiMack/Idle.png", maxFrame: 8 },
    run: { imageSrc: "./img/samuraiMack/Run.png", maxFrame: 8 },
    jump: { imageSrc: "./img/samuraiMack/Jump.png", maxFrame: 2 },
    takeHit: { imageSrc: "./img/samuraiMack/TakeHit.png", maxFrame: 4 },
    fall: { imageSrc: "./img/samuraiMack/Fall.png", maxFrame: 2 },
    death: { imageSrc: "./img/samuraiMack/Death.png", maxFrame: 6 },
    attack1: { imageSrc: "./img/samuraiMack/Attack1.png", maxFrame: 6 },
    attack2: { imageSrc: "./img/samuraiMack/Attack2.png", maxFrame: 6 },
  },
  isDead: false,
});
//enemy character constructor
const enemy = new Fighter({
  //initial position of enemy
  position: {
    x: 600,
    y: 200,
  },
  //initial speed of movement of enemy
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -80,
    y: 170,
  },
  imageSrc: "./img/kenji/Idle.png",
  maxFrame: 4,
  scale: 2.5,
  sprites: {
    idle: { imageSrc: "./img/kenji/Idle.png", maxFrame: 4 },
    run: { imageSrc: "./img/kenji/Run.png", maxFrame: 8 },
    jump: { imageSrc: "./img/kenji/Jump.png", maxFrame: 2 },
    takeHit: { imageSrc: "./img/kenji/TakeHit.png", maxFrame: 3 },
    fall: { imageSrc: "./img/kenji/Fall.png", maxFrame: 2 },
    death: { imageSrc: "./img/kenji/Death.png", maxFrame: 7 },
    jump: { imageSrc: "./img/kenji/Jump.png", maxFrame: 2 },
    attack1: { imageSrc: "./img/kenji/Attack1.png", maxFrame: 4 },
    attack2: { imageSrc: "./img/kenji/Attack2.png", maxFrame: 4 },
  },
  isDead: false,
});
//draw enemy and player
player.draw();
enemy.draw();
decreaseTimer();
//creating key object to not interrupt different movements on keyup vs keydown
const keys = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowUp: { pressed: false },
};


// //messing with AI
function enemyAI() {
  const distance = Math.abs(player.position.x - enemy.position.x);

  // Behavior thresholds
  const attackRange = 100;
  const closeRange = 200;

  // Reset velocity
  enemy.velocity.x = 0;

  if (enemy.health < 20 && distance > closeRange) {
    // Retreat when health is low
    enemy.velocity.x = player.position.x < enemy.position.x ? 2 : -2;
    enemy.switchSprites("run");
  } else if (distance > closeRange) {
    // Move toward the player
    enemy.velocity.x = player.position.x < enemy.position.x ? -2 : 2;
    enemy.switchSprites("run");
  } else if (distance <= attackRange) {
    // Attack player if in range
    if (!enemy.isAttacking && Math.random() < 0.01 ) enemy.attack();
  } else {
    // Idle
    enemy.switchSprites("idle");
  }

  // Optional: Random jumping
  if (Math.random() < 0.01 && enemy.velocity.y === 0 && !enemy.isDead) {
    enemy.velocity.y = -15;
  }
}


/* RESIZE CANVAS FUNCTION */
// function resizeCanvas() {
//   const aspectRatio = 1024 / 576;
//   const width = window.innerWidth;
//   const height = window.innerHeight;
  
//   if (width / height > aspectRatio) {
//       canvas.width = height * aspectRatio;
//       canvas.height = height;
//   } else {
//       canvas.width = width;
//       canvas.height = width / aspectRatio;
//   }
// }
// window.addEventListener("resize", resizeCanvas);
// resizeCanvas();




//animation function
function animate() {
  if (isPaused) return
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  shop.update();
  player.update();
  enemy.update();
  if(gameMode){
    enemyAI()
  }

  //make sure player and enemy stop moving when key is up
  player.velocity.x = 0;
  enemy.velocity.x = 0;
  //idle player
  if (player.velocity.x === 0) {
    player.switchSprites("idle");
  }
  //idle enemy
  if (enemy.velocity.x === 0) {
    enemy.switchSprites("idle");
  }
  //player movement animation
  if (keys.a.pressed && player.lastKey === "a" && !player.isDead) {
    player.velocity.x = -5; //5fps
    player.switchSprites("run");
  } else if (keys.d.pressed && player.lastKey === "d" && !player.isDead) {
    player.velocity.x = 5; //5fps
    player.switchSprites("run");
  }

  // if (player.position.x <= 0) {
  //   player.position.x = - player.width; // Prevent moving beyond the left boundary
  // } else if (player.position.x + player.width > canvas.width) {
  //   player.position.x = canvas.width - player.width; // Prevent moving beyond the right boundary
  // }
  

  //if player is jumping
  if (player.velocity.y < 0) {
    player.currentFrame = 0;
    player.switchSprites("jump");
  } else if (player.velocity.y > 0) {
    player.currentFrame = 0;

    player.switchSprites("fall");
  }

  //enemy movement animation
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft" && !enemy.isDead) {
    enemy.velocity.x = -5; //5fps
    enemy.switchSprites("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight" && !enemy.isDead) {
    enemy.velocity.x = 5; //5fps
    enemy.switchSprites("run");
  }
  //if enemy is jumping
  if (enemy.velocity.y < 0) {
    enemy.currentFrame = 0;
    enemy.switchSprites("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.currentFrame = 0;

    enemy.switchSprites("fall");
  }

  //detect for attack collision
  //player attacks enemy
  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking && !player.isDead
  ) {
    player.isAttacking = false;

    enemy.switchSprites("takeHit");
    enemy.health -= 5;
    gsap.to("#enemyHealth", {
      width: enemy.health + "%",
    });
  }
  //enemy attacks player
  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking && !enemy.isDead
  ) {
    enemy.isAttacking = false;

    player.switchSprites("takeHit");
    player.health -= 5;
    gsap.to("#playerHealth", {
      width: player.health + "%",
    });
  }

  //end game when health reaches 0
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timer });
  }
  if (enemy.health <= 0) {
    enemy.isDead = true;
    enemy.switchSprites("death");
  }
  if (player.health <= 0) {
    player.isDead = true;
    player.switchSprites("death");
  }
}
  
//key handling events
const handleKeyPress = (event, isPressed) => {
  if (isPaused) return
  if(gameOver) return

  switch (event.key) {
    case "d":
      keys.d.pressed = isPressed;
      player.lastKey = isPressed ? "d" : null;
      break;
    case "a":
      keys.a.pressed = isPressed;
      player.lastKey = isPressed ? "a" : null;
      break;
    case "w":
      if (isPressed && !player.isDead) player.velocity.y = -20;
      break;
    case " ":
      if (isPressed && !player.isDead) player.attack();
      break;
    case "ArrowRight":
      if(!gameMode){
      keys.ArrowRight.pressed = isPressed;
      enemy.lastKey = isPressed ? "ArrowRight" : null;}
      break;
    case "ArrowLeft":
      if(!gameMode){
      keys.ArrowLeft.pressed = isPressed;
      enemy.lastKey = isPressed ? "ArrowLeft" : null;}
      break;
    case "ArrowUp":
      if (isPressed && !enemy.isDead && !gameMode) enemy.velocity.y = -20;
      break;
    case "ArrowDown":
      if (isPressed && !enemy.isDead && !gameMode) enemy.attack();
      break;
  }
};
window.addEventListener("keydown", (event) => handleKeyPress(event, true));
window.addEventListener("keyup", (event) => handleKeyPress(event, false));

//countdown before fight starts
function startCountdown() {
  const countdownText = document.getElementById("countdownText");
  const messages = ["Get Ready!", "3", "2", "1", "Fight!"];
  let index = 0;

  // Display the countdown
  countdownText.style.opacity = 1;

  const newinterval = setInterval(() => {
    if (index < messages.length) {
      countdownText.textContent = messages[index];
      index++;
    } else {
      // Hide the countdown after it's done
      countdownText.style.opacity = 0;
      clearInterval(newinterval);
      gameStart = true


    }
  }, 1000); // 1 second per message
}
// Call this function to start the countdown, e.g., on game start



animate(); //start animating
startCountdown(); //start counting down


