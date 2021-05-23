// Question object arrays with answers
var questionBank = [
    {question:"Which operator checks for strict equality?",
     answers: {
         a: "==",
         b: "===",
         c: "!==",
         d: "="
     }, 
     correctAnswer:"===" 
    }, 
    {question:"What is a callback?", 
     answers: {
         a: "A phone call made to return a call received",
         b: "Functions passed as an argument to another function to be executed once an event has occurred or a certain task is complete",
         c: "The main way to run a function",
         d: "Functions passed as a parameter to another method to be executed once an event has occured or a certain task is complete"
        },
     correctAnswer:"Functions passed as an argument to another function to be executed once an event has occurred or a certain task is complete"
    },
    {question:"When does the postfix increment operator evaluate to the value?", 
     answers: {
         a: "After it is incremented",
         b: "After & Before",
         c: "Depends on the code",
         d: "Before it is incremented"
        },
     correctAnswer: "Before it is incremented"
    },
    {question:"What does DOM stand for?", 
     answers: {
         a:"Document Object Model",
         b:"Document Object Mode",
         c:"Document Of Model",
         d:"Document Off Mode"
        },
     correctAnswer:"Document Object Model"
    },
    {question:"What is the difference between an expression and a statement?", 
    answers: {
        a:"Expression accepts a value and a statement performs an action",
        b:"Statement produces a value and a expression performs an action",
        c:"Expression produces a value and a statement performs an action",
        d:"Statement produces a value and a expression accepts an action"
    },
    correctAnswer:"Expression produces a value and a statement performs an action"
    }
];
var highscoreArry = [];

//Global varables
var timer = document.getElementById("timerDisplay");
var timeLeft = 60;
var indexNum = 0; //keep question with choices and correct answer
var startButton = document.getElementById("beginButton");
var highscoreLink = document.getElementById("highScoresList");
var restartQuiz = document.getElementById("restartLink");
var timeInterval; //interval to run timer
var evalInterval; //to evaluate if the user did not run out of time
var answer; //to store correct answer from questionBank array
var selectedAnswer; //to store users selected answer
var highscoreContainer = document.createElement("ul"); //to attach highscore created nodes
var initials; // to store storage key

//create quiz nodes and asign class names and padding
var main = document.querySelector(".content");
var container = document.createElement("div");
var quizTitle = document.getElementById("title")
container.className = "quizContainer";
var questionNode = document.createElement("h2");
questionNode.className = "questionEl";
questionNode.style.marginTop = "35px";
questionNode.style.marginBottom = "15px";
var answerSelection = document.createElement("ul");
answerSelection.className = "selectionList";
var answerA = document.createElement("li");
answerA.className = "answerChoice";
var answerB = document.createElement("li");
answerB.className = "answerChoice";
var answerC = document.createElement("li");
answerC.className = "answerChoice";
var answerD = document.createElement("li");
answerD.className = "answerChoice";
// selector for event listener
var answerBtns = document.getElementsByClassName("answerChoice");


//timer function
function countDown () {
    timeInterval = setInterval(function() {
        if(timeLeft > 0) {
            timeLeft--;
            timer.textContent = timeLeft + " Seconds";
            
        }else {
            clearInterval(timeInterval);
        }
    }, 1000);
    
};
// begin quiz function 
    var beginQuiz = function() {
        //remove landing page content
        var landingDescription = document.getElementById("quizDescription");
        landingDescription.remove();
        
        // append quiz structure
        main.appendChild(container);
        container.appendChild(questionNode);
        container.appendChild(answerSelection);
        answerSelection.appendChild(answerA);
        answerSelection.appendChild(answerB);
        answerSelection.appendChild(answerC);
        answerSelection.appendChild(answerD);
        // begin timer
        countDown(); 
        //populate first question
        generateQuestion();
        //add events to answer choices
        selectChoiceEvent();
        // interval to run scoreEval to check if user runs out of time
        timerEval();

    
        
    }
    
    var timerEval = function() {
        evalInterval = setInterval(function(){
            scoreEval();

        }, 500);
    }
    
    // generate question function
    // when clicking on start button, the timer begins and a question is generated dynamically from the quiz questions array.
    // JS pulls off the landing page and adds the question with choices (use buttons)
    
    var generateQuestion = function() {
        //populate created nodes
        if(indexNum < 5) { // to ensure there are still questions to be answered
        questionNode.textContent = questionBank[indexNum].question;
        answerA.textContent = questionBank[indexNum].answers.a;
        answerB.textContent = questionBank[indexNum].answers.b;
        answerC.textContent = questionBank[indexNum].answers.c;
        answerD.textContent = questionBank[indexNum].answers.d;
        answer = questionBank[indexNum].correctAnswer;
        }
    }
    //add event listener to answer choice nodes and evaluate choosen answer with correct answer 
    //  and perform functionality with corresponding result
    var selectChoiceEvent = function() {
        if(indexNum < 5) {
            for(var i = 0; i < answerBtns.length; i++){
                answerBtns[i].addEventListener("click", function(){
                    // grab the button's innertext
                    selectedAnswer = this.textContent;
                    
                    if (selectedAnswer == answer) {
                        timeLeft += 5;
                        console.log("correct");
                    }else if(selectedAnswer !== answer) {
                        timeLeft -= 15;
                        console.log("wrong");
                    }
                    
                    indexNum++;
                    scoreEval()
                    generateQuestion();
                    
                });
            };
        };
    };
    
    
    var retrievedUserInfo;
    // create highscore container and populate with created nodes
    var highscore = function() {
        timer.remove();
        quizTitle.remove();
        questionNode.remove();
        answerSelection.remove();
        container.appendChild(highscoreContainer);
        
        
        retrievedUserInfo = JSON.parse(localStorage.getItem(initials));
        var highscoreBanner = document.createElement("li");
        highscoreBanner.className = "highscoreHeader";
        highscoreBanner.textContent = "Highscore";
        var hiscoreEl = document.createElement("li");
        hiscoreEl.className = "highscoreNode"
        hiscoreEl.innerHTML = "User : " + retrievedUserInfo.user  + " Score : " + retrievedUserInfo.score;
        highscoreContainer.appendChild(highscoreBanner);
        highscoreBanner.appendChild(hiscoreEl)
        
        
    }
    
    
    
    // evaluate timer/questions function to know when to stop timer and store data
    var scoreEval = function() {
        // pass quiz
        if(timeLeft > 0 && indexNum == 5) {
            clearInterval(timeInterval);  //stop timer
            clearInterval(evalInterval);  //stop evaluating timer
            initials = window.prompt("Enter Initials");
            // store data to local drive 
            var storedInfo = JSON.stringify({
                score: timeLeft,
                user: initials
            });                           
            localStorage.setItem(initials, storedInfo);
            //remove question and answers for highscore nodes
            questionNode.remove();
            answerSelection.remove();
            //place ul for highscore nodes
            //create and append highscore node
            highscore();
            
            console.log(highscoreArry);
            //failed quiz
        }else if (timeLeft <= 0) { 
            location.reload();
            alert("Sorry, You ran out of time. w3schools.com wouldn't hurt");
        };
    }; 
    var restart = function() {
        location.reload();
    }
    
    
    
  

        // stop and convert timer to string when last question is answered
        // display congrats message with score (left over time)
    // generate a input field for initials and a submit button
    // create object for score/initials input
    // save scoreData object to localStorage
    // send user to highscore page
    
    // highscore function
    // -pull scoreData objects from localStorage
    // -insert scoreData object into li
    // -display generated ul
    
    //add event listener to answerSelection
    
    // var answerEvent = document.getElementsByClassName("answerChoice");
    // answerEvent = document.addEventListener("click", generateQuestion);
    startButton.addEventListener("click", beginQuiz);
    restartQuiz.addEventListener("click", restart)
