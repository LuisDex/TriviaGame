
   var Questions= [
        qOne = {question: "What kind of mage is Vivi from Final Fantasy IX?", correctone: "Black Mage", falseOnes: ["Time Mage", "Red Mage", "White Mage"], image:"assets/images/Vivi.jpg"},
        qSecond = {question: "What are the names of the Four Elemental Archfiends from FFIV (FFII US)?", correctone: "Scarmiglione, Cagnazzo, Barbariccia, and Rubicante", falseOnes: ["Garland, Golbez, Kefka, and Sephiroth", "Lich, Marilith, Kraken, and Tiamat", "Flamerus Rex, Ice Golem, Dualhead Hydra, and Pazuzu"], image:"assets/images/fiends.jpg"},
        qThird = {question: "Which of these Summons ONLY appeared in FF8", correctone: "Tonberry King ", falseOnes: ["Bahamut", "Chocobo", "Shiva"], image:"assets/images/tonberry.png"},
        qFourth = {question: "How many consecutive lightning bolts do you have to dodge in the Thunder Plains to obtain the Venus Sigil for Lulu's Celestial Weapon?", correctone: "200", falseOnes: ["999", "50", "400"], image:"assets/images/onion.jpg"},
        qFifth = {question: "In FF6, what are the names of the two optional party members found in the mountains of Narshe?", correctone: "Mog & Umaro", falseOnes: ["Cecil & Kain", "Palom & Porom", "Yeti & Wendigo"], image:"assets/images/mog.jpg"},
        qSixth = {question: "In FF6, what is the name of the Villanous Ruler of the Empire?",correctone: "Gestahl", falseOnes: ["Kefka", "Gogo", "Golbez"], image:"assets/images/Gestahl.png"},
        qSeventh = {question: "What is the name of the Yellow Bird you can use to travel in the Final Fantasy games?", correctone: "Chocobos", falseOnes: ["Moogles", "Espers", "Eidolons"], image:"assets/images/chocobo.png"},
        qEighth = {question: "What is the name of the King of Dragons? ", correctone: "Bahamut", falseOnes: ["King Tonberry", "Shiva", "Gogo"], image:"assets/images/bahamut.png"},
        qNinth = {question: "What was another name used for the spell 'Holy'?", correctone: "Pearl", falseOnes: ["Aeroga","Heal","Flare"], image:"assets/images/holy.png"},
        qTenth = {question: "Biggs and Wedge are recurring characters in the Final Fantasy series named after characters from which of these franchises: ", correctone: "Star Wars", falseOnes: ["The Lord of the Rings", "DC Comics", "Marvel Comics"], image:"assets/images/vader.jpg"},
        qEleventh = {question:"Who was the first character to have the job of a Dark Knight in the series?", correctone: "Leon", falseOnes: ["Cecil", "Cloud", "Squall"], image:"assets/images/Leon.jpg"},
        qTwelfth = {question: "What is the name of Odin's sword?", correctone: "Zantetsuken", falseOnes: ["Masamune","Muramasa","Buster"], image:"assets/images/odin.jpg"},
        qThirteenth = {question: "What item must you give Bahamut in order to upgrade your job classes in FF1?",correctone: "Rat Tail", falseOnes: ["Phoenix Down", "Mythril", "Blood Orb"], image:"assets/images/rat.png"},
        qFourteenth = {question: "What is the name of the optional superboss found in the Chocobo's Air Garden in FF9?", correctone: "Ozma", falseOnes: ["Omega", "Ruby", "Emerald"], image:"assets/images/Ozma.png"},
        qFifteenth = {question: "The song 'Dancing Mad' is the theme of which Main Series villain?", correctone: "Kefka", falseOnes: ["Sephiroth", "Golbez","Seymour"], image:"assets/images/kefka.jpg"}
];
var guessRight = 0;
var guessWrong = 0;
var guessTimeOut = 0;
var time = 30;
var counting;
var delayCont;
var sessionQ = [];
var rightbtn = 0;
var game;
var nextQ;
var y=0;
var rightText = "";
var imageQ;
var z=0;

$(document).ready(function(){

//Function that resets all variables at the start of a game
function varReset()
{
  guessRight = 0;
  guessWrong = 0;
  guessTimeOut = 0;
  time = 30;
  counting;
  delayCont; 
  sessionQ = [];
  rightbtn = 0;
  game;
  nextQ;
  y=0;
  
};

// Function that takes the answers of a question and shuffles their order.
function shuffleAnswers(x)
{
 var j = 0;
 var qlog = [];
 var rightOne = Math.floor(Math.random()*4);
 for(var i = 0; i < 4; i++)
 {
   if(i === rightOne)
   {
    qlog.push(x.correctone);
    rightText = x.correctone;
    rightbtn = i + 1;
   }else{
    qlog.push(x.falseOnes[j]);
    j++;
   }
 };
return qlog;
};

//Function that sets the interval for the timer
function countDown()
{
  counting = setInterval(timeLeft, 1000);
};

//Function that starts the question timer and handles the possibility of it running out without an answer
function timeLeft()
{
  if(time>=0)
  {
  $("#timer").text("Time Left: " + time);
  time--;
  } else {
    guessTimeOut++;
    y++;
    emptyIt();
    $("#askIt").text("Times Up!");
      var showImg = $("<img>").attr("src", imageQ).addClass("mx-auto d-block gameImage");
      $("#Qimage").append(showImg);
    $("#answerIs").text("The correct answer was: " + rightText);
    
    setTimeout(function(){quizIt(y)}, 5000);
  };
};

//Function that creates the answer buttons and sets the answers for them
function dispAnswers(x)
{
  for(w=0;w<x.length;w++)
  {
    var btns = $("<button>").attr("type", "button");
    $(btns).addClass("btn btn-primary btn-lg btn-block");
    var attrID= w + 1;
    $(btns).attr("id",attrID);
    $(btns).attr("value", attrID);
    $(".playscreen").append(btns);

  }
  $("#answerIs").empty();
  $("#Qimage").empty();
  $("#1").text(x[0]);
  $("#2").text(x[1]);
  $("#3").text(x[2]);
  $("#4").text(x[3]);
};

//Function that takes 10 random questions from the array and ensures there are no repeats
function randQ(x)
{
 for(j=0;j<x.length;j++)
 {
   var rNum = Math.floor(Math.random()*x.length);
   if(!sessionQ.includes(x[rNum]))
   {
     sessionQ.push(x[rNum]);
   } else {
       j--;
   };
 };
};

//Function that displays the current question
function dispQuestion(x)
{
 $("#askIt").text(x.question);
 imageQ=x.image;
};

//Function that empties the question and the answers, then resets timer
function emptyIt(){
clearInterval(counting);
$("#timer").empty();
$("#askIt").empty();
$("#1").remove();
$("#2").remove();
$("#3").remove();
$("#4").remove();
time = 30;
};

//Function that cycles through the questions as they are answered
function quizIt(t)
{
  //Verifies if there are any questions remaining, if so then it continues with the game
  if(t<10)
 {
  //Sets and displays the timer for the question, shuffles answers and displays them along with the question
  countDown();

  var answShuf = shuffleAnswers(sessionQ[t]);
  dispAnswers(answShuf);
  dispQuestion(sessionQ[t]);

  //Listens for which answer the player clicks and verifies if they are right or wrong, assuming there is still time left to answer
  $(".btn").on("click",function(){
    var answerValue = ($(this).attr("value"));
    answerValue = parseInt(answerValue);
  
   //If the answer is correct, it increments the correct guesses, displays the answer and informs the player they are correct
    if ((answerValue === rightbtn) && (time > 0))
    {
      guessRight++;
      emptyIt();
      $("#askIt").text("YOU ARE CORRECT!");
      y++;
      var showImg = $("<img>").attr("src", imageQ).addClass("mx-auto d-block gameImage");
      $("#Qimage").append(showImg);
      $("#answerIs").text("The answer is: " + rightText);
      setTimeout(function(){quizIt(y)}, 5000);
      
    } else if ((answerValue != rightbtn) && (time > 0))
    //If the answer is incorrect, it increments the incorrect guesses, displays the answer and informs the player they are wrong
     {
      guessWrong++;
      emptyIt();
      $("#askIt").text("YOU ARE WRONG!");
      y++;
      var showImg = $("<img>").attr("src", imageQ).addClass("mx-auto d-block gameImage");
      $("#Qimage").append(showImg);
      $("#answerIs").text("The correct answer was: " + rightText);
      setTimeout(function(){quizIt(y)}, 5000);
     }
  })
 }else
 {
   //If all the questions have been asked the game displays the amount of correct, incorrect and timed out guesses then waits to see if the player wants to play again.
   emptyIt();
   $("#answerIs").empty();
   $("#Qimage").empty();
   $("#askIt").text("Game Over!");
   var againBtn = $("<button>").attr("type","button").addClass("btn btn-secondary btn-lg btn-block start-btn").text("Play Again?");
   $(".playscreen").append(againBtn);
   $("#right").text("Questions answered correctly: " + guessRight);
   $("#wrong").text("Questions answered incorrectly: " + guessWrong);
   $("#skipped").text("Questions that timed out: " + guessTimeOut);
  
   //Waits for player to click if they want to play again. If so it resets everything, clears all variables and starts the game over.
   $(".start-btn").on("click",function(){
    varReset();
    $("#right").empty();
    $("#wrong").empty();
    $("#skipped").empty();
    $(".start-btn").remove();
    game = newGame();
    });

 }
};

//Function that starts a new game
function newGame()
{
randQ(Questions);
quizIt(y);
};

//Waits for player click the "Start" button to begin the game
$(".start-btn").on("click",function(){
varReset();
$(".start-btn").remove();
game = newGame();
});
});