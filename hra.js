let currentPlayer = 'circle';

const classAddCircle = (event) => {
  event.target.classList.add('board__field--circle');
  const img = document.querySelector('#nowplays');
  img.src = 'cross.svg';
  event.target.disabled = true;
};

const classAddCross = (event) => {
  event.target.classList.add('board__field--cross');
  const img = document.querySelector('#nowplays');
  img.src = 'circle.svg';
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
}

document
  .querySelector('button:nth-child(1)')
  .addEventListener('click', circleCrossSwitch);
document
  .querySelector('button:nth-child(2)')
  .addEventListener('click', circleCrossSwitch);
document
  .querySelector('button:nth-child(3)')
  .addEventListener('click', circleCrossSwitch);
document
  .querySelector('button:nth-child(4)')
  .addEventListener('click', circleCrossSwitch);
document
  .querySelector('button:nth-child(5)')
  .addEventListener('click', circleCrossSwitch);
document
  .querySelector('button:nth-child(6)')
  .addEventListener('click', circleCrossSwitch);
document
  .querySelector('button:nth-child(7)')
  .addEventListener('click', circleCrossSwitch);
document
  .querySelector('button:nth-child(8)')
  .addEventListener('click', circleCrossSwitch);
document
  .querySelector('button:nth-child(9)')
  .addEventListener('click', circleCrossSwitch);
document
  .querySelector('button:nth-child(10)')
  .addEventListener('click', circleCrossSwitch);
