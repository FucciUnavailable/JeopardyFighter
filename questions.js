const modal = document.getElementById("questionModal");
const modalQuestion = document.getElementById("modalQuestion");
const modalAnswers = document.getElementById("modalAnswers");
const modalCountdown = document.getElementById("modalCountdown");

const sideButtons = document.getElementById("sideButtons");
const pauseButton = document.getElementById("pauseButton");

const questions = [
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
    }
];

let countdownInterval;
let gamePaused = false;

// Function to pause the game
function pauseGame() {
    // Implement game pause logic (e.g., stop timers, animations, etc.)
    gamePaused = true;
}

// Function to resume the game
function resumeGame() {
    // Implement game resume logic (e.g., restart timers, animations, etc.)
    gamePaused = false;
}

// Function to show the modal with a random question
function showQuestionModal() {
    pauseGame();
    modal.classList.remove("hidden");
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    // Set question text
    modalQuestion.textContent = randomQuestion.question;

    // Clear previous answers
    modalAnswers.innerHTML = "";

    // Add answer buttons
    randomQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full";
        button.addEventListener("click", () => handleAnswerClick(answer, randomQuestion.correct));
        modalAnswers.appendChild(button);
    });

    // Start countdown
    let timeLeft = 10;
    modalCountdown.textContent = timeLeft;
    countdownInterval = setInterval(() => {
        timeLeft--;
        modalCountdown.textContent = timeLeft;
        if (timeLeft <= 0) {
            closeModal();
        }
    }, 1000);
}

// Function to handle answer click
function handleAnswerClick(selectedAnswer, correctAnswer) {
    clearInterval(countdownInterval);
    if (selectedAnswer === correctAnswer) {
        alert("Correct! You get a power-up!");
        // Grant power-up logic here
    } else {
        alert("Incorrect!");
    }
    closeModal();
}

// Function to close the modal
function closeModal() {
    modal.classList.add("hidden");
    clearInterval(countdownInterval);
    resumeGame();
}

// Example trigger: show modal when clicking a button
pauseButton.addEventListener("click", showQuestionModal);
