// Selecting the pause button
const pauseButton = document.getElementById('pauseButton');
let isPaused = false; // Initial pause state

// Function to toggle the game pause state
const togglePause = () => {
    isPaused = !isPaused;
    if (isPaused) {
        pauseButton.textContent = "Resume";
    } else {
        pauseButton.textContent = "Pause";
        animate()
        decreaseTimer()
    }
};

// Adding event listener to the pause button
pauseButton.addEventListener('click', togglePause);


