var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() { // check if game is started

  if (!started) {

    $("#level-title").text("Level " + level); //change heading text
    nextSequence();
    started = true;

  }
});

$(".btn").click(function(event) { // on button clicks

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1); //use index of last input of last click to check answer

});

function checkAnswer(currentLevel) { //check user answer

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) { // check the rest of the input and run nextSequence with delay

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {

    gameOver();
    console.log("wrong");
startOver();

  }
}

function nextSequence() { //generating sequence

  userClickedPattern = []; //clear array to check next answer
  level++; // increase level each time nextSequence is called
  $("#level-title").text("Level " + level); // update heading

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) { // how to play sounds

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColor) { //some animations

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function gameOver() {

  $("#level-title").text("Game Over, Press Any Key To Restart");
  var wrongSound = new Audio("sounds/wrong.mp3");
  wrongSound.play();

  $(document.body).addClass("game-over");
  setTimeout(function() {
    $(document.body).removeClass("game-over");
  }, 200);

}

function startOver() {
  started = false;
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
}
