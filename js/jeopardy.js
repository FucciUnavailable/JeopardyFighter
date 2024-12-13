let healthBonus = 0;
 // Import questions from questions.js
 const trumpCardQuestions = [
    {
      question: "What is the integral of sin(x)?",
      answers: [
        { text: "cos(x)", correct: false },
        { text: "-cos(x)", correct: true },
        { text: "sin(x)", correct: false },
        { text: "-sin(x)", correct: false },
      ]
    },
    {
      question: "What is the capital of Australia?",
      answers: [
        { text: "Sydney", correct: false },
        { text: "Canberra", correct: true },
        { text: "Melbourne", correct: false },
        { text: "Brisbane", correct: false },
      ]
    },
    {
      question: "What is the chemical formula of methane?",
      answers: [
        { text: "CH4", correct: true },
        { text: "CO2", correct: false },
        { text: "C2H6", correct: false },
        { text: "CH3OH", correct: false },
      ]
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Venus", correct: false },
        { text: "Mars", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: false },
      ]
    },
    {
      question: "What is the square root of 256?",
      answers: [
        { text: "14", correct: false },
        { text: "16", correct: true },
        { text: "12", correct: false },
        { text: "18", correct: false },
      ]
    },
    {
      question: "Who developed the theory of relativity?",
      answers: [
        { text: "Newton", correct: false },
        { text: "Einstein", correct: true },
        { text: "Galileo", correct: false },
        { text: "Tesla", correct: false },
      ]
    },
    {
      question: "In which year did the Titanic sink?",
      answers: [
        { text: "1910", correct: false },
        { text: "1912", correct: true },
        { text: "1905", correct: false },
        { text: "1920", correct: false },
      ]
    },
    // Add more questions here as needed
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
    healthBonus = 10; // Correct answer, increase health
    updatePlayerHealth(); // Update player's health in the game

    alert("Correct! Your health has increased by 10.");
  } else {
    healthBonus = -10; // Incorrect answer, decrease health
    updatePlayerHealth(); // Update player's health in the game
    updateEnemyHealth()
    alert("Incorrect! Your health has decreased by 10.");
  }

  // Move to the next question or end the game
  currentQuestionIndex++;

  if (currentQuestionIndex < trumpCardQuestions.length - 2) {
    // Show the next question
    showTrumpCardModal();
  } else {
    // End the game
    alert("You've answered all questions! Final health: " + healthBonus);
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

// Function to update player health in the main game
function updateEnemyHealth() {
  enemy.health -= healthBonus; // Update the player's health with the bonus
  gsap.to("#enemyHealth", { // Assuming you're using GSAP for animation
    width: enemy.health + "%" // Update the health bar
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

