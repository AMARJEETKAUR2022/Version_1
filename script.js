
// Selected the elements using document.getElementById property
var blueCar = document.getElementById("bluecar"); // Get the blue car element
var raceCar = document.getElementById("racecar"); // Get the race car element
var result = document.getElementById("result"); // Get the result display element
var score = document.getElementById("score"); // Get the score display element
var game = document.getElementById("game"); // Get the game area element
var jumpsound = document.getElementById("jumpsound"); // Get a sound element for jumping

// Initialize a counter to keep score
var counter = 0; // Initialize the game score
var bgPosition = 0; // Initial background position for the game's background
var bgSpeed = 3; // Adjust the value for the background speed

// Function to start the game
function startGame() {
    var startScreen = document.getElementById("start-screen"); // Get the start screen element

    // Hide the start screen and show the game
    startScreen.style.display = "none"; // Hide the start screen
    game.style.display = "block"; // Show the game area
    moveBackground(); // Start moving the background
}

// Blue car movements through animationiteration event
blueCar.addEventListener("animationiteration", function () {
    // Randomly positioning the blue car within the game area
    var random = (Math.floor(Math.random() * 3)) * 130; // Randomly place the blue car left and right
    blueCar.style.left = random + "px"; // Set the blue car's position
    counter++; // Increase the score
});

// Function to move the background
function moveBackground() {
    bgPosition += bgSpeed; // Update the background position for a scrolling effect
    game.style.backgroundPosition = `0 ${bgPosition}px`; // Apply the updated background position
    requestAnimationFrame(moveBackground); // Continue moving the background
}

// Race car movement through both keyboard and touch events
function moveRaceCar(direction) {
    var raceCarLeft = parseInt(getComputedStyle(raceCar).getPropertyValue("left")); // Get the current position of the race car

    if (direction === "right" && raceCarLeft < 260) {
        raceCar.style.left = (raceCarLeft + 130) + "px"; // Move the race car to the right
    } else if (direction === "left" && raceCarLeft > 0) {
        raceCar.style.left = (raceCarLeft - 130) + "px"; // Move the race car to the left
    }

    jumpsound.play(); // Play a sound when moving
}

// Keyboard event listener for race car movement
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault(); // Prevent the default behavior of arrow keys
        moveRaceCar(e.key === "ArrowRight" ? "right" : "left");
    }
});

// Touch event listeners for race car movement
document.addEventListener("touchstart", function (e) {
    e.preventDefault(); // Prevent the default touch behavior

    var touchX = e.touches[0].clientX; // Get the X coordinate of the touch

    var raceCarLeft = parseInt(getComputedStyle(raceCar).getPropertyValue("left")); // Get the current position of the race car

    if (touchX > raceCarLeft && raceCarLeft < 260) {
        moveRaceCar("right"); // Move the race car to the right
    } else if (touchX < raceCarLeft && raceCarLeft > 0) {
        moveRaceCar("left"); // Move the race car to the left
    }
});

document.addEventListener("touchmove", function (e) {
    e.preventDefault(); // Prevent the default touch behavior
});

// Check for game over conditions
setInterval(function Gameover() {
    var blueCarTop = parseInt(getComputedStyle(blueCar).getPropertyValue("top")); // Get the top position of the blue car
    var blueCarLeft = parseInt(getComputedStyle(blueCar).getPropertyValue("left")); // Get the left position of the blue car
    var raceCarLeft = parseInt(getComputedStyle(raceCar).getPropertyValue("left")); // Get the left position of the race car

    if (blueCarLeft === raceCarLeft && blueCarTop > 450 && blueCarTop < 650) {
        crashsound.play(); // Play a crash sound
        result.style.display = "block"; // Show the game over result
        game.style.display = "none"; // Hide the game
        score.innerHTML = `Score: ${counter}`; // Display the final score

        counter = 0; // Reset the score for a new game
    }
}, 10); // Check for game over conditions every 10 milliseconds
