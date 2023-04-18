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
}

const reloadButton = document.querySelector('#reload');
reloadButton.onclick = function () {
  if (confirm('Opravdu chcete začít znovu?')) {
    location.reload();
  }
  return event.preventDefault();
};

const allGameFieldButtons = document.querySelectorAll('.playfield__button');

console.log(allGameFieldButtons);

allGameFieldButtons.forEach((button) => {
  button.addEventListener('click', circleCrossSwitch);
});
