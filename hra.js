import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

const allGameFieldButtons = document.querySelectorAll('.playfield__button');

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

const allButtonsDisabled = () => {
  Array.from(allGameFieldButtons).map((button) => {
    return (button.disabled = true);
  });
};

const freeButtonsActivate = () => {
  Array.from(allGameFieldButtons).map((button) => {
    if (
      button.classList.contains('board__field--circle') ||
      button.classList.contains('board__field--cross')
    ) {
      return (button.disabled = true);
    } else {
      return (button.disabled = false);
    }
  });
};

let count = 0;

function circleCrossSwitch() {
  count++;
  if (count % 2 === 1) {
    classAddCircle(event);
    allButtonsDisabled();
    fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: Array.from(allGameFieldButtons).map((button) => {
          if (button.classList.contains('board__field--circle')) {
            return 'o';
          }
          if (button.classList.contains('board__field--cross')) {
            return 'x';
          } else {
            return '_';
          }
        }),
        player: 'x',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { x, y } = data.position;
        const field = allGameFieldButtons[x + y * 10];
        freeButtonsActivate();
        field.click();
        allButtonsDisabled();
        setTimeout(freeButtonsActivate, 150);
      });
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

  const circlesOnlyArrayLength = Array.from(allGameFieldButtons).filter(
    (button) => button.classList.contains('board__field--circle'),
  ).length;
  const crossesOnlyArrayLength = Array.from(allGameFieldButtons).filter(
    (button) => button.classList.contains('board__field--cross'),
  ).length;
  const allAlreadyPlayedButtonsArrayLength =
    circlesOnlyArrayLength + crossesOnlyArrayLength;
  if (allAlreadyPlayedButtonsArrayLength === 100) {
    setTimeout(function () {
      alert('Hra skončila nerozhodně.🤷🏼');
      location.reload();
    }, 500);
  }
}

const reloadButton = document.querySelector('#reload');
reloadButton.onclick = function () {
  if (confirm('Opravdu chcete začít znovu?🙀')) {
    location.reload();
  }
  return event.preventDefault();
};

allGameFieldButtons.forEach((button) => {
  button.addEventListener('click', circleCrossSwitch);
});
