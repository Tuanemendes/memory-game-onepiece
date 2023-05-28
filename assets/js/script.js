const cards = document.querySelectorAll('.c-card');
let cardFlipped = false;
let blockCards = false;
let firstCard, secondCard;


function redirectGame() {
    window.location.href = "memory-game.html";

}

function flipCard() {

    if (blockCards) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');
    if (!cardFlipped) {
        cardFlipped = true;
        firstCard = this;
        return;
    }
    cardFlipped = false;
    secondCard = this;
    checkCard();
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


(function wrap(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


