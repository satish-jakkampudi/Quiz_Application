 const quizData = [
  {
    question: "Who is known as the 'God of Cricket' in India?",
    options: ["Virat Kohli", "MS Dhoni", "Sachin Tendulkar", "Kapil Dev"],
    answer: 2
  },
  {
    question: "Who was the captain of the Indian team when they won the 2011 Cricket World Cup?",
    options: ["Virat Kohli", "Sourav Ganguly", "Rahul Dravid", "MS Dhoni"],
    answer: 3
  },
  {
    question: "Which Indian bowler took 10 wickets in a single Test innings?",
    options: ["Anil Kumble", "Harbhajan Singh", "Jasprit Bumrah", "Ravichandran Ashwin"],
    answer: 0
  },
  {
    question: "Who holds the record for the fastest century in ODIs for India?",
    options: ["Virender Sehwag", "Yuvraj Singh", "Rohit Sharma", "Virat Kohli"],
    answer: 3
  },
  {
    question: "How many times has India won the ICC T20 World Cup (as of 2024)?",
    options: ["Once", "Twice", "Three times", "Never"],
    answer: 0
  },
  {
    question: "Which Indian cricketer is known for hitting six sixes in an over in a T20 World Cup match?",
    options: ["Rohit Sharma", "Yuvraj Singh", "KL Rahul", "Shreyas Iyer"],
    answer: 1
  }
];

let currentQuestion = 0;
let selectedAnswers = new Array(quizData.length).fill(null);
let isSubmitted = new Array(quizData.length).fill(false);
let score = 0;

const questionText = document.getElementById("question-text");
const optionList = document.getElementById("option-list");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion(index) {
  const q = quizData[index];
  questionText.textContent = `Q${index + 1}. ${q.question}`;
  optionList.innerHTML = "";
  feedback.textContent = "";

  q.options.forEach((option, i) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => selectAnswer(i));
    if (selectedAnswers[index] === i) {
      li.classList.add("selected");
    }
    optionList.appendChild(li);
  });

  if (isSubmitted[index]) showFeedback();

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === quizData.length - 1;
  submitBtn.disabled = selectedAnswers[index] === null || isSubmitted[index];
}

function selectAnswer(i) {
  if (isSubmitted[currentQuestion]) return;

  selectedAnswers[currentQuestion] = i;
  const options = optionList.querySelectorAll("li");
  options.forEach((li, idx) => {
    li.classList.remove("selected");
    if (idx === i) li.classList.add("selected");
  });

  submitBtn.disabled = false;
}

function showFeedback() {
  const correctIndex = quizData[currentQuestion].answer;
  const selectedIndex = selectedAnswers[currentQuestion];
  const options = optionList.querySelectorAll("li");

  options.forEach((li, i) => {
    if (i === correctIndex) li.classList.add("correct");
    if (i === selectedIndex && i !== correctIndex) li.classList.add("incorrect");
    li.classList.remove("selected");
  });

  feedback.textContent =
    selectedIndex === correctIndex
      ? "✔️ Correct!"
      : `❌ Incorrect! Correct answer: ${quizData[currentQuestion].options[correctIndex]}`;
}

submitBtn.addEventListener("click", () => {
  if (selectedAnswers[currentQuestion] === null || isSubmitted[currentQuestion]) return;

  isSubmitted[currentQuestion] = true;

  if (selectedAnswers[currentQuestion] === quizData[currentQuestion].answer) {
    score++;
  }

  showFeedback();

  // Show final score if it's the last question
  if (isSubmitted.every((s) => s)) {
    scoreDisplay.textContent = `🎯 Final Score: ${score} / ${quizData.length}`;
    restartBtn.style.display = "inline-block";
  }
  submitBtn.disabled = true;
});

nextBtn.addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  selectedAnswers = new Array(quizData.length).fill(null);
  isSubmitted = new Array(quizData.length).fill(false);
  score = 0;
  scoreDisplay.textContent = "";
  restartBtn.style.display = "none";
  loadQuestion(currentQuestion);
});

window.onload = () => {
  loadQuestion(currentQuestion);
};
