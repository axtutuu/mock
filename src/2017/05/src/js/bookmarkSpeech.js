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
    case 'ジャンプ':
    case 'jump':
    case 'プ':
    case 'p':
      $u.mousedown();
      setTimeout(() => {
        $u.mouseup();
      }, 800);
      break;
    case '右':
    case 'ぎ':
      $r.mousedown();
      $l.mouseup();
      break;
    case '左':
    case 'り':
      $l.mousedown();
      $r.mouseup();
      break;
    case '止まれ':
    case 'とまれ':
    case 'れ':
      $r.mouseup();
      $l.mouseup();
      break;
  }
  console.log(text);
});

(function init() {
  console.log('start');
  rec.start();
})();

