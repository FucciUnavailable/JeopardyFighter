const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const timer = document.getElementById("timer")
const playerHealth = document.getElementById("playerHealth")
const enemyHealth = document.getElementById("enemyHealth")
canvas.width = 1024;
canvas.height = 576;
const displayText = document.querySelector("#displayText")

c.fillRect(0, 0, canvas.width, canvas.height);

//how fast players fall
const gravity = 0.7;


const background = new Sprite({
  position: {
    x:0,
    y:0
  },
  imageSrc: "./img/background.png"
})
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
    x: 0,
    y: 0,
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


//determine the winner function
function determineWinner({player,enemy, timerId}) {
    clearTimeout(timerId)
    displayText.style.display = "flex"
    if(player.health > enemy.health){
      displayText.innerHTML = "PLAYER 1 WINS"
    }else if(enemy.health > player.health){
      displayText.innerHTML = "ENEMY WINS"
    }else{
      displayText.innerHTML = "TIE"
    }
  
}






let time = 60
let timerId
//timer function
function decreaseTimer() {
  if(time >0){
    timerId = setTimeout(decreaseTimer, 1000)
    time --
    timer.innerHTML = time
  }
  if (timer === 0){
    determineWinner({player,enemy})
  }

}

decreaseTimer()

//animation function
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update()
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
    
    player.isAttacking = false;
    enemy.health -= 5
    enemyHealth.style.width = enemy.health.toString() + "%"
  }
  //enemy attacks player
  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking) {
    enemy.isAttacking = false;
     player.health -=5;
    playerHealth.style.width = player.health.toString() + "%"
  }

  //end game when health reaches 0
    if (enemy.health <= 0 || player.health <=0){
        determineWinner({player, enemy, timerId})
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
