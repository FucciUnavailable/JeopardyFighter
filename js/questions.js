let healthBonus = 0;
const trumpCardQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
    ]
  },
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "6", correct: false },
    ]
  },
  {
    question: "Who wrote 'Hamlet'?",
    answers: [
      { text: "Shakespeare", correct: true },
      { text: "Dickens", correct: false },
      { text: "Hemingway", correct: false },
      { text: "Austen", correct: false },
    ]
  },
  // Add more questions here
];

let currentQuestionIndex = 0; // Keeps track of the current question being asked

// Function to show the Trump Card modal
function showTrumpCardModal() {
  const modal = document.getElementById('trumpCardModal');
  const questionText = document.getElementById('questionText');
  const answersContainer = document.getElementById('answersContainer');

  modal.classList.remove('hidden'); // Show the modal

  // Get the current question
  const currentQuestion = trumpCardQuestions[currentQuestionIndex];

  // Set the question text
  questionText.textContent = currentQuestion.question;

  // Add the answers dynamically
  answersContainer.innerHTML = ''; // Clear any previous answers
  currentQuestion.answers.forEach((answer, index) => {
    const answerButton = document.createElement('button');
    answerButton.textContent = answer.text;
    answerButton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'px-6', 'py-3', 'rounded-lg', 'shadow-lg', 'w-full');
    answerButton.onclick = function() {
      checkAnswer(answer.correct);
    };
    answersContainer.appendChild(answerButton);
  });
}

// Function to check the answer
function checkAnswer(isCorrect) {
    healthBonus = 0
  if (isCorrect) {
    healthBonus += 10; // Correct answer, increase health
    alert("Correct! Your health has increased by 10.");
  } else {
    healthBonus -= 10; // Incorrect answer, decrease health
    alert("Incorrect! Your health has decreased by 10.");
  }

  // Move to the next question or end the game
  currentQuestionIndex++;

  if (currentQuestionIndex < trumpCardQuestions.length) {
    // Show the next question
    showTrumpCardModal();
  } else {
    // End the game
    alert("You've answered all questions! Final health: " + healthBonus);
    updatePlayerHealth(); // Update player's health in the game
    closeTrumpCardModal();
  }
}

// Function to update player health in the main game
function updatePlayerHealth() {
  player.health += healthBonus; // Update the player's health with the bonus
  gsap.to("#playerHealth", { // Assuming you're using GSAP for animation
    width: player.health + "%" // Update the health bar
  });
}

// Function to close the Trump Card modal
function closeTrumpCardModal() {
  const modal = document.getElementById('trumpCardModal');
  modal.classList.add('hidden'); // Hide the modal
}

// Example to show the Trump Card modal (you can call this when the player clicks the Trump Card button)
document.getElementById('trumpCard').addEventListener('click', showTrumpCardModal);

// When the player health is updated from the Trump Card, this will be reflected here
// (Ensure player.health is a global object or shared between files)

