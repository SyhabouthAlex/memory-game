const cards = document.querySelectorAll(".game-card");
const backs = document.querySelectorAll(".back");
const newGameButton = document.querySelector("#new-game");
let cardAmount = cards.length;
let firstCard = null;
let secondCard = null;
let flippedCards = 0;
let currentScore = 0;
let highScore = localStorage.getItem("high-score");

if (highScore) {
    document.querySelector("#best-score").innerText = highScore;
}

function createGame() {
    let oneCard = 0;
    let twoCard = 0;
    let threeCard = 0;
    let fourCard = 0;
    let fiveCard = 0;
    let sixCard = 0;
    let sevenCard = 0;
    let eightCard = 0;
    
    for (let card of cards) {
        card.className = "game-card"
    }

    for (let card of cards) {
        card.addEventListener("click", cardClick);
      }

    setScore(0);

    for (let back of backs) {
        back.children[0].className = "open";
    }

    while (oneCard < 2 || twoCard < 2 || threeCard < 2 || fourCard < 2 || fiveCard < 2 || sixCard < 2 || sevenCard < 2 || eightCard < 2) {
        for (let back of backs) {
            let cardChoice = Math.floor(Math.random() * 8)
            if (cardChoice === 0 && back.children[0].className === "open" && oneCard < 2){
                back.children[0].src = "https://c7.uihere.com/files/178/590/572/playing-card-ace-of-hearts-one-card-suit-heart-playing-cards.jpg";
                back.children[0].className = "";
                oneCard++;
            }                
            if (cardChoice === 1 && back.children[0].className === "open" && twoCard < 2){
                back.children[0].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Playing_card_heart_2.svg/614px-Playing_card_heart_2.svg.png";
                back.children[0].className = "";
                twoCard++;
            }
            if (cardChoice === 2 && back.children[0].className === "open" && threeCard < 2){
                back.children[0].src = "https://cdn.pixabay.com/photo/2015/08/11/11/56/hearts-884154_960_720.png";                    
                back.children[0].className = "";
                threeCard++;
            }
            if (cardChoice === 3 && back.children[0].className === "open" && fourCard < 2){
                back.children[0].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Playing_card_spade_4.svg/819px-Playing_card_spade_4.svg.png";
                back.children[0].className = "";
                fourCard++;
            }
            if (cardChoice === 4 && back.children[0].className === "open" && fiveCard < 2){
                back.children[0].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_club_5.svg/819px-Playing_card_club_5.svg.png";
                back.children[0].className = "";
                fiveCard++;
            }
            if (cardChoice === 5 && back.children[0].className === "open" && sixCard < 2){
                back.children[0].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Playing_card_spade_6.svg/1200px-Playing_card_spade_6.svg.png";
                back.children[0].className = "";
                sixCard++;
            }
            if (cardChoice === 6 && back.children[0].className === "open" && sevenCard < 2){
                back.children[0].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Playing_card_club_7.svg/819px-Playing_card_club_7.svg.png";
                back.children[0].className = "";
                sevenCard++;
            }
            if (cardChoice === 7 && back.children[0].className === "open" && eightCard < 2){
                back.children[0].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Playing_card_diamond_8.svg/819px-Playing_card_diamond_8.svg.png";
                back.children[0].className = "";
                eightCard++;               
            }
        }
    }
}

createGame();

newGameButton.addEventListener('click', createGame);

function cardClick(e) {
    if (!e.target.classList.contains("front")) return;

    let currentCard = e.target.parentElement;

    if (!firstCard || !secondCard) {
      if (!currentCard.classList.contains("flipped")) {
        setScore(currentScore + 1);
      }
      currentCard.classList.add("flipped");
      firstCard = firstCard || currentCard;
      secondCard = currentCard === firstCard ? null : currentCard;
    }

    if (firstCard && secondCard) {
      let img1 = firstCard.children[1].children[0].src;
      let img2 = secondCard.children[1].children[0].src;

      if (img1 === img2) {
        flippedCards += 2;
        firstCard.removeEventListener("click", cardClick);
        secondCard.removeEventListener("click", cardClick);
        firstCard = null;
        secondCard = null;
      } else {
        setTimeout(function() {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          firstCard = null;
          secondCard = null;
        }, 1000);
      }
    }

    if(flippedCards === cardAmount) {
        endGame();
    }
}

function setScore(newScore) {
    currentScore = newScore;
    document.getElementById("current-score").innerText = currentScore;
  }
    


function endGame() {
    let highScore = +localStorage.getItem("high-score") || Infinity;
    if (currentScore < highScore) {
        localStorage.setItem("high-score", currentScore);
    }
    document.querySelector("#best-score").innerText = highScore;
}