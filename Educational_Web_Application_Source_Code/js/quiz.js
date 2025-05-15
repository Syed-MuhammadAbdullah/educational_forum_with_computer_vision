// Quiz data with questions for each category
const quizData = {
  html: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Markup Language",
        "Hyper Tabular Markup Language",
        "Hyper Text Makeup Language"
      ],
      correctAnswer: "Hyper Text Markup Language",
      explanation: "HTML stands for HyperText Markup Language. It is the standard markup language for documents designed to be displayed in a web browser."
    },
    {
      question: "Which HTML element is used to define the title of a document?",
      options: [
        "<meta>",
        "<head>",
        "<title>",
        "<header>"
      ],
      correctAnswer: "<title>",
      explanation: "The <title> element defines the title of the document, which appears in the browser's title bar or page tab."
    },
    {
      question: "Which tag is used to create a hyperlink?",
      options: [
        "<a>",
        "<link>",
        "<href>",
        "<hyperlink>"
      ],
      correctAnswer: "<a>",
      explanation: "The <a> (anchor) tag is used to create a hyperlink to another page or a specific location within a page."
    },
    {
      question: "What is the correct HTML element for inserting a line break?",
      options: [
        "<br>",
        "<lb>",
        "<break>",
        "<newline>"
      ],
      correctAnswer: "<br>",
      explanation: "The <br> element produces a line break in text (carriage-return). It is useful for writing addresses or poems."
    },
    {
      question: "What is the purpose of the HTML <aside> element?",
      options: [
        "To define content aside from the page content like a sidebar",
        "To create a side navigation menu",
        "To set aside space for an image",
        "To define an ASCII character set"
      ],
      correctAnswer: "To define content aside from the page content like a sidebar",
      explanation: "The <aside> element defines content that is tangentially related to the content around it, which could be considered separate from that content, like a sidebar."
    },
    {
      question: "Which HTML5 element is used to specify a footer for a document or section?",
      options: [
        "<footer>",
        "<bottom>",
        "<section>",
        "<end>"
      ],
      correctAnswer: "<footer>",
      explanation: "The <footer> element specifies a footer for a document or section and typically contains author information, copyright information, links, etc."
    },
    {
      question: "What does the required attribute do in an input field?",
      options: [
        "Makes the input field read-only",
        "Specifies that the input field must be filled out",
        "Makes the input field disabled",
        "Requires the input to be a specific type"
      ],
      correctAnswer: "Specifies that the input field must be filled out",
      explanation: "The required attribute is a boolean attribute that specifies that an input field must be filled out before submitting the form."
    },
    {
      question: "Which HTML5 element is used to specify the main content of a document?",
      options: [
        "<content>",
        "<body>",
        "<main>",
        "<section>"
      ],
      correctAnswer: "<main>",
      explanation: "The <main> element specifies the main content of a document. There should be only one <main> element in a document."
    },
    {
      question: "What is the correct way to create a checkbox in HTML?",
      options: [
        "<input type=\"check\">",
        "<input type=\"checkbox\">",
        "<checkbox>",
        "<input type=\"checkmark\">"
      ],
      correctAnswer: "<input type=\"checkbox\">",
      explanation: "The correct way to create a checkbox in HTML is with <input type=\"checkbox\">. This creates a box that can be ticked to make a selection."
    },
    {
      question: "Which attribute is used to provide an alternative text for an image?",
      options: [
        "alt",
        "title",
        "src",
        "description"
      ],
      correctAnswer: "alt",
      explanation: "The alt attribute provides alternative text for an image if it cannot be displayed, and is also used by screen readers to describe the image to visually impaired users."
    }
  ],
  css: [
    // CSS questions here
  ],
  javascript: [
    // JavaScript questions here
  ],
  bootstrap: [
    // Bootstrap questions here
  ],
  php: [
    // PHP questions here
  ],
  mysql: [
    // MySQL questions here
  ],
  sass: [
    // SASS questions here
  ],
  jquery: [
    // jQuery questions here
  ]
};

// DOM elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const categoryBtns = document.querySelectorAll('.category-btn');
const categoryTitle = document.getElementById('category-title');
const questionCounter = document.getElementById('question-counter');
const timerElement = document.getElementById('timer');
const progressBar = document.getElementById('progress');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const explanationContainer = document.getElementById('explanation-container');
const resultIndicator = document.getElementById('result-indicator');
const explanationText = document.getElementById('explanation-text');
const nextBtn = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const scorePercentageElement = document.getElementById('score-percentage');
const feedbackMessageElement = document.getElementById('feedback-message');
const correctCountElement = document.getElementById('correct-count');
const incorrectCountElement = document.getElementById('incorrect-count');
const unansweredCountElement = document.getElementById('unanswered-count');
const correctBarElement = document.getElementById('correct-bar');
const incorrectBarElement = document.getElementById('incorrect-bar');
const unansweredBarElement = document.getElementById('unanswered-bar');
const tryAgainBtn = document.getElementById('try-again-btn');
const newQuizBtn = document.getElementById('new-quiz-btn');

// Quiz state
let currentCategory = '';
let questions = [];
let currentQuestionIndex = 0;
let selectedAnswer = null;
let answers = [];
let score = 0;
let timer = null;
let timeLeft = 30;

// Initialize quiz
function init() {
  // Add event listeners to category buttons
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      startQuiz(currentCategory);
    });
  });

  // Add event listener to next button
  nextBtn.addEventListener('click', nextQuestion);

  // Add event listeners to try again and new quiz buttons
  tryAgainBtn.addEventListener('click', () => {
    startQuiz(currentCategory);
  });

  newQuizBtn.addEventListener('click', () => {
    showScreen(startScreen);
  });
}

// Start quiz
function startQuiz(category) {
  currentCategory = category;
  // Get questions from selected category and shuffle them
  questions = [...quizData[category]];
  shuffleArray(questions);
  // Limit to 10 questions
  questions = questions.slice(0, 10);
  
  currentQuestionIndex = 0;
  answers = new Array(questions.length).fill(null);
  score = 0;
  
  // Format category name for display
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  categoryTitle.textContent = `${formattedCategory} Quiz`;
  
  showScreen(quizScreen);
  showQuestion();
}

// Show current question
function showQuestion() {
  selectedAnswer = null;
  explanationContainer.classList.add('hidden');
  
  const question = questions[currentQuestionIndex];
  
  // Update question counter and progress bar
  questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
  progressBar.style.width = `${((currentQuestionIndex) / questions.length) * 100}%`;
  
  // Set question text
  questionText.textContent = question.question;
  
  // Create options
  optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.textContent = option;
    optionElement.addEventListener('click', () => selectAnswer(option));
    optionsContainer.appendChild(optionElement);
  });
  
  // Start timer
  startTimer();
}

// Select an answer
function selectAnswer(answer) {
  if (selectedAnswer !== null) return; // Already answered
  
  selectedAnswer = answer;
  answers[currentQuestionIndex] = answer;
  
  // Stop timer
  clearInterval(timer);
  
  // Highlight selected option
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    if (option.textContent === answer) {
      option.classList.add('selected');
    }
  });
  
  // Show correct/incorrect after a short delay
  setTimeout(() => {
    showResult(answer);
  }, 500);
}

// Show if answer is correct or not
function showResult(answer) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  const isCorrect = answer === correctAnswer;
  
  if (isCorrect) {
    score++;
  }
  
  // Highlight correct and incorrect options
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    if (option.textContent === correctAnswer) {
      option.classList.add('correct');
    } else if (option.textContent === answer && !isCorrect) {
      option.classList.add('incorrect');
    }
  });
  
  // Show explanation
  explanationContainer.classList.remove('hidden');
  resultIndicator.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
  resultIndicator.className = isCorrect ? 'correct' : 'incorrect';
  explanationText.textContent = questions[currentQuestionIndex].explanation;
}

// Move to next question or show results
function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showResults();
  }
}

// Show results screen
function showResults() {
  showScreen(resultsScreen);
  
  // Calculate stats
  const totalQuestions = questions.length;
  const correctCount = score;
  const unansweredCount = answers.filter(a => a === null).length;
  const incorrectCount = totalQuestions - correctCount - unansweredCount;
  
  const scorePercentage = Math.round((score / totalQuestions) * 100);
  
  // Update results display
  scoreElement.textContent = score;
  totalQuestionsElement.textContent = totalQuestions;
  scorePercentageElement.textContent = `${scorePercentage}%`;
  
  // Set feedback message based on score
  if (scorePercentage >= 90) {
    feedbackMessageElement.textContent = 'Outstanding! You\'re an expert!';
  } else if (scorePercentage >= 70) {
    feedbackMessageElement.textContent = 'Great job! You have solid knowledge!';
  } else if (scorePercentage >= 50) {
    feedbackMessageElement.textContent = 'Good effort! Keep learning!';
  } else {
    feedbackMessageElement.textContent = 'Keep practicing! You\'ll improve!';
  }
  
  // Update stat bars
  correctCountElement.textContent = correctCount;
  incorrectCountElement.textContent = incorrectCount;
  unansweredCountElement.textContent = unansweredCount;
  
  correctBarElement.style.width = `${(correctCount / totalQuestions) * 100}%`;
  incorrectBarElement.style.width = `${(incorrectCount / totalQuestions) * 100}%`;
  unansweredBarElement.style.width = `${(unansweredCount / totalQuestions) * 100}%`;
}

// Timer functions
function startTimer() {
  timeLeft = 30;
  updateTimerDisplay();
  
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      timeoutAnswer();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerElement.textContent = `${timeLeft}s`;
  
  // Change color based on time left
  if (timeLeft <= 10) {
    timerElement.style.color = '#ea4335';
  } else if (timeLeft <= 20) {
    timerElement.style.color = '#fbbc05';
  } else {
    timerElement.style.color = '#1a73e8';
  }
}

function timeoutAnswer() {
  answers[currentQuestionIndex] = null;
  
  // Show explanation with timeout message
  explanationContainer.classList.remove('hidden');
  resultIndicator.textContent = 'Time\'s up!';
  resultIndicator.className = '';
  explanationText.textContent = `The correct answer was: ${questions[currentQuestionIndex].correctAnswer}`;
  explanationText.textContent += `\n${questions[currentQuestionIndex].explanation}`;
}

// Helper functions
function showScreen(screen) {
  // Hide all screens
  startScreen.classList.add('hidden');
  quizScreen.classList.add('hidden');
  resultsScreen.classList.add('hidden');
  
  // Show requested screen
  screen.classList.remove('hidden');
  
  // Clear timer if switching away from quiz
  if (screen !== quizScreen) {
    clearInterval(timer);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);