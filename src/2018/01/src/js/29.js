const slot = document.querySelector('#slot1');
const submit = document.querySelector('#submit');

let pos = 0
let frameId;
const roll = () => {
  frameId = window.requestAnimationFrame(roll)
  slot.style.transform = `translateY(-${pos}px)`
  pos += 10
  if (pos > 540) pos = 0
}

roll()

submit.addEventListener('click', () => {
  window.cancelAnimationFrame(frameId);
});
