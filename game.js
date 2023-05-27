alert("Rules for this game:\n1.First the game chooses a colour\n2.Click the colour the game chose\n3.The game selects one colour every level\n4.You have to select the chosen colour in the given pattern that is you have to select the colour chosen in this level by first selecting the colours chosen in before levels in that order.");

var gamePattern=[];
var userClickedPattern=[];

var started = false;
var level=0;

var buttonColours=["red", "blue", "green", "yellow"];

$(document).on("keypress",function(){
  if(!started)
  {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){

  var userChosenColour= $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);

      $("#level-title").text("Game Over, Press any key to restart!!");

      startOver();
    }
}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
