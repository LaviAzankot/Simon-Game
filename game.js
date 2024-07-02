var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];

// Detect keypress and start the game 
$(document).keypress(function(){
    if (!started){
        nextSequence();
        $("#level-title").text("Level " + level); 
        started = true;
    }
    
})


// Detect button clicks
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            // If the user did the sequence right.
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        // If the user wasn't right.
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
    // Create a random number between 0-3
    var randomNumber = Math.floor(Math.random() * 4);
    // Get a random colour
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // Get a random button an animate it using a flash.
    randomChosenButton = $("#" + randomChosenColour);
    randomChosenButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // Play sound.
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
    // Add the class of press and after 100 miliseconds remove it.
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    // Restart all variables.
    level = 0;
    gamePattern  = [];
    started = false;
}
