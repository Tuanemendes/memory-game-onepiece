const cards = document.querySelectorAll('.c-card');
let cardFlipped = false;
let blockCards = false;
let firstCard, secondCard;

// temporizador
let seconds = 0;
let minutes = 0;
const timer = document.getElementById("timer");
let timerInterval;
let flippedCards = 0;
const totalCards = 20;
let isPaused = false;
const playPauseIcon = document.getElementById('play-pause-icon');
const icons = ['\u25B6', '\u23F8'];

function redirectGame() {
    window.location.href = "memory-game.html";
}

function flipCard() {
    startTimer();
    if (isPaused) return;
    if (blockCards || this === firstCard) return;

    this.classList.toggle('flip');
    console.log(this);

    if (!cardFlipped) {
        cardFlipped = true;
        firstCard = this;
        return;
    }
    cardFlipped = false;
    secondCard = this;
    checkCard();

    flippedCards++;
    if (flippedCards === totalCards) {
        endGame();
    }
}

function checkCard() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();

    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCards();
}

function unflipCards() {
    blockCards = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCards();
    }, 1000);
}

function resetCards() {
    [cardFlipped, blockCards] = [false, false];
    [firstCard, secondCard] = [null, null];
}


(function wrap() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

// temporizador

function startTimer() {
    if (isPaused) return;
    timerInterval = setInterval(function () {
        if (isPaused) return;
        updateTimer();
    }, 1000);
    playPauseIcon.classList.remove('play');
    playPauseIcon.classList.add('pause');
}
function updateTimer() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }
    var formattedSeconds = padZero(seconds);
    var formattedMinutes = padZero(minutes);
    timer.textContent = formattedMinutes + ":" + formattedSeconds;
}

function padZero(number) {
    return number < 10 ? "0" + number : number;
}

function endGame() {
    clearInterval(timerInterval);
    alert("Jogo Terminado!");
}

// pausar o jogo

function pauseGame() {
    isPaused = !isPaused;
}

function toggleTimer() {
    pauseGame();

    if (isPaused) {
        clearInterval(timerInterval);
    } else {
        startTimer();
    }
    togglePlayPause();
}


function togglePlayPause() {
    playPauseIcon.innerHTML = isPaused ? icons[0] : icons[1];
    console.log(playPauseIcon.innerHTML);
}

const pauseButton = document.getElementById('play-pause-icon');
pauseButton.addEventListener('click', toggleTimer);
cards.forEach(card => card.addEventListener('click', flipCard));



