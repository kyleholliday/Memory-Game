// Declaring all the variables from the jump
var scores, totalScore, activePlayer, firstGuess, secondGuess, count, previousTarget, fullDeck, delay, matched;

// init gets called on load and when the New Game button is pressed
init();

function init() {
  scores = [0, 0];
  totalScore = 0;
  activePlayer = 0;
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
  delay = 1000;

  // Removes the matched class from all cards
  matched = document.querySelectorAll('.match');
  matched.forEach(card => {
    card.classList.remove('match');
  });

  // Resets all values back to the beginning state
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.querySelector('.name-0').textContent = "Red Player";
  document.querySelector('.name-1').textContent = "Blue Player";
  document.querySelector('.player-0').classList.remove('active');
  document.querySelector('.player-0').classList.add('active');
  document.querySelector('.player-1').classList.remove('active');

  // Deletes all cards from the gameboard so a new deck isn't appended to the current deck
  if (document.querySelector('.card')) {
    var cardStack = document.getElementsByClassName('card');
    while (cardStack[0]) {
      cardStack[0].parentNode.removeChild(cardStack[0]);
    }
  };

  // Card array is created
  const cardsArray = [{
      name: 'two',
      img: 'img/two.png'
    },
    {
      name: 'three',
      img: 'img/three.png'
    },
    {
      name: 'four',
      img: 'img/four.png'
    },
    {
      name: 'five',
      img: 'img/five.png'
    },
    {
      name: 'six',
      img: 'img/six.png'
    },
    {
      name: 'seven',
      img: 'img/seven.png'
    },
    {
      name: 'eight',
      img: 'img/eight.png'
    },
    {
      name: 'nine',
      img: 'img/nine.png'
    },
    {
      name: 'ten',
      img: 'img/ten.png'
    }
  ]

  // Duplicate the array to make the full deck
  fullDeck = cardsArray.concat(cardsArray);

  // Randomize the cards
  fullDeck.sort(() => 0.5 - Math.random());

  // For every item inside the card deck, make a 'card' div - also a 'front' div and a 'back' div that get appended to the card
  fullDeck.forEach(item => {

    // Card div is created
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;

    // Card front is created
    const front = document.createElement('div');
    front.classList.add('front');

    // Card back is created
    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${item.img})`;

    // The grid gets created and all the cards get appended to it
    const grid = document.getElementById('grid');

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });
};

// The event listener for clicking cards gets set
grid.addEventListener('click', function(event) {

  // Checks what gets clicked
  let clicked = event.target;

  // Checks to see if a) the target clicked is a card or the grid itself, b) the second card clicked is the same as the first, c) the card had already been selected, or d) the card has already been declared a match
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return
  };

  // Checks how many cards have been selected this turn
  if (count < 2) {
    count++;
    // First card selection
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      // Second card selection
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    };
    // If two cards have been selected ...
    if (firstGuess !== '' && secondGuess !== '') {
      // If the two cards match
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        setTimeout(resetGuess, delay);
      } else {
        // The turn moves to the next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        // Changes the current score count back to zero
        document.querySelector('.player-0').classList.toggle('active');
        document.querySelector('.player-1').classList.toggle('active');
        setTimeout(resetGuess, delay);
      }
    }
    // Shows that the previously clicked card has already been clicked and can't be matched with itself
    previousTarget = clicked;
  }
});

// Match function that gets called if both guesses are a match
const match = () => {
  var selected = document.querySelectorAll('.selected');
  // Checks all card to mark which ones are matched
  selected.forEach(card => {
    card.classList.add('match')
  });
  // Adds a point to the current player's score
  scores[activePlayer] += 1;
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  // Checks if all the matches have been made
  if (scores[0] + scores[1] == 9) {
    // If Red Player has more points, they are declared the winner
    if (scores[0] > scores[1]) {
      document.querySelector('.name-0').textContent = "RED WINS";
    } else {
      // If Blue Player has more points, they are declared the winner
      document.querySelector('.name-1').textContent = "BLUE WINS";
    }
  }
};

// Resets the guesses and the count
const resetGuess = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected')
  });
};

// Calls a new game (init function) when the New Game button is clicked
document.querySelector('.new-game').addEventListener('click', init);
