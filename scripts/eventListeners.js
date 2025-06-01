document.querySelectorAll('.button, .operatorButton').forEach(button => {
  button.addEventListener('click', () => {
    playSound('half-squeak');
    appendValue(button.value);
  });
});
