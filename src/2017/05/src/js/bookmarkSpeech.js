const rec = new webkitSpeechRecognition();
rec.continuous = true;
rec.interimResults = true;

const $u = $('#uButton');
const $r = $('#rButton');
const $l = $('#lButton');


rec.addEventListener('result', (e) => {
  console.log(e)
  var text = e.results[e.results.length-1][0].transcript;
  switch(text.slice(-1)) {
    case 'プ':
    case 'p':
      control($u);
      break;
    case '右':
    case 'ぎ':
      control($r);
      break;
    case '左':
    case 'り':
      control($l);
      break;
  }
  console.log(text);
});

function control($el) {
  $el.mousedown();
  setTimeout(() => {
    $el.mouseup();
  }, 800);
}

(function init() {
  console.log('start');
  rec.start();
})();

