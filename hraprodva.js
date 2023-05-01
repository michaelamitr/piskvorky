import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

const classAddCircle = (event) => {
  event.target.classList.add('board__field--circle');
  const img = document.querySelector('#nowplays');
  img.src = 'cross-green.svg';
  event.target.disabled = true;
};

const classAddCross = (event) => {
  event.target.classList.add('board__field--cross');
  const img = document.querySelector('#nowplays');
  img.src = 'circle-purple.svg';
  event.target.disabled = true;
};

let count = 0;

function circleCrossSwitch() {
  count++;
  if (count % 2 === 1) {
    classAddCircle(event);
  } else {
    classAddCross(event);
  }
  const allGameFieldButtonsArray = Array.from(allGameFieldButtons).map(
    (button) => {
      if (button.classList.contains('board__field--circle')) {
        return 'o';
      }
      if (button.classList.contains('board__field--cross')) {
        return 'x';
      } else {
        return '_';
      }
    },
  );
  const winner = findWinner(allGameFieldButtonsArray);
  if (winner === 'o' || winner === 'x') {
    setTimeout(function () {
      alert(`Vyhrál hráč se symbolem "${winner}"🥳🍾!`);
      location.reload();
    }, 500);
  }
  let allButtonsDisabled = true;
  allGameFieldButtons.forEach((button) => {
    if (!button.disabled) {
      allButtonsDisabled = false;
    }
  });

  if (allButtonsDisabled) {
    setTimeout(function () {
      alert('Hra skončila nerozhodně.');
      location.reload();
    }, 500);
  }
}

const reloadButton = document.querySelector('#reload');
reloadButton.onclick = function () {
  if (confirm('Opravdu chcete začít znovu?')) {
    location.reload();
  }
  return event.preventDefault();
};

const allGameFieldButtons = document.querySelectorAll('.playfield__button');

allGameFieldButtons.forEach((button) => {
  button.addEventListener('click', circleCrossSwitch);
});
