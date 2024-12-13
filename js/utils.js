let gameOver = false



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
  function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId);
    gameOver = true
    // Get modal elements
    const winnerModal = document.getElementById('winnerModal');
    const winnerText = document.getElementById('winnerText');
    const closeButton = document.getElementById('closeModalButton');
  
    // Determine the winner
    if (player.health > enemy.health) {
      winnerText.textContent = "PLAYER 1 WINS";
    } else if (enemy.health > player.health) {
      winnerText.textContent = "ENEMY WINS";
    } else {
      winnerText.textContent = "TIE";
    }
  
    // Show the modal with the winner
    winnerModal.style.display = "block";
  
    // Close modal when the close button is clicked
    closeButton.addEventListener("click", () => {
      winnerModal.style.display = "none";
    });
  
    // Close modal when the 'X' (close) button is clicked
    const closeModalButton = document.querySelector(".close");
    closeModalButton.addEventListener("click", () => {
      winnerModal.style.display = "none";
    });
  }
  
  //GAME TIMER HERE
  let time = 60
  let timerId
  //timer function
  function decreaseTimer() {
    if (isPaused) return

    if(time >0){
      timerId = setTimeout(decreaseTimer, 1000)
      time --
      timer.innerHTML = time
    }
    if (timer === 0){
      gameOver = true
      determineWinner({player,enemy, timerId})
    }
  
  }

