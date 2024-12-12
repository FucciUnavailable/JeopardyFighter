// Selecting elements
const pauseButton = document.getElementById('pauseButton');
const howToPlayBtn = document.getElementById('howToPlayBtn');
const howToPlayModal = document.getElementById('howToPlayModal');
let isPaused = false; // Initial pause state
let gamePausedBeforeModal = false; // Track if the game was paused before the modal opened

// Function to toggle the game pause state
const togglePause = () => {
    if (isPaused) {
        // Resuming the game
        pauseButton.textContent = "Pause";
        isPaused = false;
        animate(); // Resume game animations
        decreaseTimer(); // Resume the timer
    } else {
        // Pausing the game
        pauseButton.textContent = "Resume";
        isPaused = true;
        cancelAnimationFrame(gameAnimationFrame); // Stop animations
        clearInterval(timerInterval); // Stop timer
    }
};

// Open the "How to Play" modal and pause the game
const openHowToPlayModal = () => {
    if (!isPaused) {
        // If the game wasn't already paused, pause it
        gamePausedBeforeModal = false;
        togglePause();
    } else {
        gamePausedBeforeModal = true; // Keep track that the game was paused before modal
    }
    
    // Open the modal
    howToPlayModal.style.display = 'flex';
};

// Close the modal and resume game if it was paused before the modal opened
const closeHowToPlayModal = () => {
    // Close the modal
    howToPlayModal.style.display = 'none';
    
    // Resume the game if it was paused before the modal opened
    if (!gamePausedBeforeModal && isPaused) {
        togglePause(); // Resume the game
    }
};

// Adding event listeners to buttons
pauseButton.addEventListener('click', togglePause);
howToPlayBtn.addEventListener('click', openHowToPlayModal);

// Close the modal when the close button is clicked
document.querySelector('.close[data-modal="howToPlayModal"]').addEventListener('click', closeHowToPlayModal);

// Close the modal if the user clicks outside of the modal content
window.addEventListener('click', (e) => {
    if (e.target === howToPlayModal) {
        closeHowToPlayModal();
    }
});
