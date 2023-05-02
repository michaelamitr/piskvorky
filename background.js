const toggleBackground = () => {
  document.querySelector('#toggle').classList.toggle('background__toggle__two');
  document.querySelector('body').classList.toggle('rainbow');
};

document.querySelector('#toggle').addEventListener('click', toggleBackground);
