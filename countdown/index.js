let timer;
let timeRemaining;
let isPaused = false;

const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer-display');
const minutesInput = document.getElementById('minutes');

function updateDisplay(minutes, seconds) {
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startCountdown() {
    const minutes = parseInt(minutesInput.value);
    if (isNaN(minutes) || minutes <= 0) {
        alert('Please enter a valid number of minutes.');
        return;
    }

    timeRemaining = minutes * 60;
    isPaused = false;

    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;

    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timer);
            alert('Time is up!');
            resetTimer();
        } else {
            timeRemaining--;
            const minutesLeft = Math.floor(timeRemaining / 60);
            const secondsLeft = timeRemaining % 60;
            updateDisplay(minutesLeft, secondsLeft);
        }
    }, 1000);
}

function pauseCountdown() {
    clearInterval(timer);
    isPaused = true;

    startButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(timer);
    isPaused = false;
    timeRemaining = 0;
    updateDisplay(0, 0);

    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
}

startButton.addEventListener('click', startCountdown);
pauseButton.addEventListener('click', pauseCountdown);
resetButton.addEventListener('click', resetTimer);
