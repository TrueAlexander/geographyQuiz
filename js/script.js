
// select all elements
const start = document.getElementById("start");
const startTitle = document.getElementById("start__title");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const exit = document.getElementById("exit");

//create our questions array

let questions = [
  {
    question: "Choose the capital of the country",
    imgSrc: "..img/germany.png",
    choiceA: "Madrid",
    choiceB: "Berlin",
    choiceC: "Oslo",
    choiceD: "Budapest",
    correct: "B",
  },
  {
    question: "Where does situated this country?",
    imgSrc: "..img/portuguese.png",
    choiceA: "Africa",
    choiceB: "South America",
    choiceC: "Asia",
    choiceD: "Europe",
    correct: "D",
  },
  {
    question: "Where does situated this country?",
    imgSrc: "img/angola.png",
    choiceA: "South America",
    choiceB: "Asia",
    choiceC: "Europe",
    choiceD: "Africa",
    correct: "D",
  },
  {
    question: "What's the capital of Brazil?",
    imgSrc: "..img/brazil.png",
    choiceA: "Sao Paulo",
    choiceB: "Brasilia",
    choiceC: "Rio de Janeiro",
    choiceD: "Buenos Aires",
    correct: "B",
  },
  {
    question: "Guarani is one of the official language of...?",
    imgSrc: "..img/guarani.jpg",
    choiceA: "Paraguay",
    choiceB: "Kongo",
    choiceC: "Indonesia",
    choiceD: "Australia",
    correct: "A",
  },
  {
    question: "What is the capital of Philippines?",
    imgSrc: "..img/philippines.png",
    choiceA: "Jakarta",
    choiceB: "Hong Kong",
    choiceC: "Manila",
    choiceD: "Kuala Lumpur",
    correct: "C",
  },
  {
    question: "What's the name of the country?",
    imgSrc: "..img/georgia.png",
    choiceA: "Armenia",
    choiceB: "England",
    choiceC: "Croatia",
    choiceD: "Georgia",
    correct: "D",
  },
  {
    question: "Which is the highest peak in the world?",
    imgSrc: "..img/everest.jpg",
    choiceA: "Mont Blanc",
    choiceB: "Everest",
    choiceC: "Kilimanjaro",
    choiceD: "Elbrus",
    correct: "B",
  },
  {
    question: "What is the deepest lake in the world??",
    imgSrc: "..img/baikal.jpg",
    choiceA: "Victoria",
    choiceB: "Michigan",
    choiceC: "Baikal",
    choiceD: "Titicaca",
    correct: "C",
  },
  {
    question: "Which country was a part of Yugoslavia till 1991?",
    imgSrc: "..img/yugoslavia.png",
    choiceA: "Romania",
    choiceB: "Slovakia",
    choiceC: "Czech Republic",
    choiceD: "Slovenia",
    correct: "D",
  }
];

//shuffle question for a current game

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
shuffle(questions);

//create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; //10s
const gaugeWidth = 150; //150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//render a question
function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
} 

start.addEventListener("click", startQuiz);

//start quiz

function startQuiz () {
  start.style.display = "none";
  startTitle.style.display = "none";
  exit.style.display = "block";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); //1000ms = 1s
}

//render progress

function renderProgress () {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class = 'prog' id = "+ qIndex +"></div>";
  }
} 

//counter render

function renderCounter () {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    count = 0;
    //change progress color to red
    answerIsWrong ();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      //end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

//checkAnswer

function checkAnswer (answer) {
  if (answer == questions[runningQuestion].correct) {
    //answer is correct
    score++;
    //change progress color to green
    answerIsCorrect();
  } else {
      //answer is wrong
      //change progress color to red
      answerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    //end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
}

///answer is correct

function answerIsCorrect () {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

///answer is wrong

function answerIsWrong () {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

//score Render

function scoreRender() {
  scoreDiv.style.display = "block";

  //calculate the amount of question percent answered
  const scorePerCent = Math.round(100 * score / questions.length);
  //choose the image based on the scorePerCent

  let img = (scorePerCent >= 80) ? "../img/5.png" : 
            (scorePerCent >= 60) ? "../img/4.png" : 
            (scorePerCent >= 40) ? "../img/3.png" : 
            (scorePerCent >= 20) ? "../img/2.png" : 
            "../img/1.png";  
  scoreDiv.innerHTML = "<img src = "+ img +">";
  scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";

}

function exitTheGame() {
   ////go to the Start Game button
  location.reload();
}