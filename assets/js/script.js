
function redirectGame() {
    window.location.href = "memory-game.html";

}



const cards = document.querySelectorAll('.c-card');

function flipCard() {
    console.log('I was clicked');
    this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));