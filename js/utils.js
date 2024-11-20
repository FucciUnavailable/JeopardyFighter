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