import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

const allGameFieldButtons = document.querySelectorAll('.playfield__button');
// optional implementation
const allButtonsArray = allGameFieldButtons
  ? Array.from(allGameFieldButtons)
  : [];

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
  allButtonsArray.forEach((button) => (button.disabled = true));
};

const freeButtonsActivate = () => {
  allButtonsArray.forEach((button) => {
    if (button.classList.length === 1) {
      button.disabled = false;
    }
  });
};

const convertButtonToSymbol = (button) => {
  if (button.classList.contains('board__field--circle')) {
    return 'o';
  }
  if (button.classList.contains('board__field--cross')) {
    return 'x';
  } else {
    return '_';
  }
};

const isGameEnd = () => {
  const allGameFieldButtonsArray = allButtonsArray.map((button) =>
    convertButtonToSymbol(button),
  );
  const winner = findWinner(allGameFieldButtonsArray);

  if (winner === 'o' || winner === 'x') {
    setTimeout(function () {
      alert(`Vyhrál hráč se symbolem "${winner}"🥳🍾!`);
      location.reload();
    }, 500);
    return true;
  }

  const circlesOnlyArrayLength = allButtonsArray.filter((button) =>
    button.classList.contains('board__field--circle'),
  ).length;
  const crossesOnlyArrayLength = allButtonsArray.filter((button) =>
    button.classList.contains('board__field--cross'),
  ).length;
  const allAlreadyPlayedButtonsArrayLength =
    circlesOnlyArrayLength + crossesOnlyArrayLength;
  if (allAlreadyPlayedButtonsArrayLength === 100) {
    setTimeout(function () {
      alert('Hra skončila nerozhodně.🤷🏼');
      location.reload();
    }, 500);
    return true;
  }

  return false;
};

let count = 0;
async function circleCrossSwitch() {
  count++;
  if (count % 2 === 1) {
    classAddCircle(event);
    allButtonsDisabled();

    // Finish if game end
    if (isGameEnd()) return;

    await fetch(
      'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          board: allButtonsArray.map((button) => convertButtonToSymbol(button)),
          player: 'x',
        }),
      },
    )
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
