const toggleBackground = () => {
  document.querySelector('#toggle').classList.toggle('purple__button__toggle');
  document.querySelector('body').classList.toggle('rainbow');
};

document.querySelector('#toggle').addEventListener('click', toggleBackground);
