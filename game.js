var buttonColours = ["red", "blue", "green", "yellow"];

var pressCount = false;

var level = 0;

var gamePattern = []; //creating an empty array

var userClickedPattern = [];

$(document).keydown( function(){
    
    if( !pressCount ){
        $("#level-title").html("Level " + level);
        nextSequence();
        pressCount = true;
    }
});

$(".btn").click(function() {
    var userChosenButton = $(this).attr("id");
    userClickedPattern.push(userChosenButton);
    
    playSound(userChosenButton);

    animatePress(userChosenButton);
    
    checkAnswer(userClickedPattern.length - 1);
    //userClickedPattern.length - 1 is current level it is diff from uCP - 1 and GP -1 as it is checking CUP[i] to GP[i] as ucp is getting built on every click
});



function checkAnswer( currentLevel ) {
    
    // console.log("game " + gamePattern);
    // console.log("user " + userClickedPattern);
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("success"); //writing success here is very imp as both arrays are getting check with each element entry in the user pattern array
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);

        }
    } else {
        // console.log("wrong");

        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level);

    var randomNumber = Math.floor( Math.random() * 4 );    
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);    
  
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    pressCount = false;
}


