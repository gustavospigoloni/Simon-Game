let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;

$(KeyboardEvent).on("keypress", function () {
  if (level === 0) nextSequence();
});

$(".btn").on("click", function () {
  if (level > 0) {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(level);
  }
});

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];

  level += 1;
  $("#level-title").text("Level " + level);

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(currentColor) {
  let audio = new Audio("sounds/" + currentColor + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  let index = userClickedPattern.length;
  if (currentLevel > index) {
    if (userClickedPattern[index - 1] !== gamePattern[index - 1]) {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("GAME OVER, press any key to restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
  } else {
    setTimeout(() => {
      nextSequence();
    }, 1000);
    userClickedPattern = [];
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}
