import $ from 'jquery';

let inputX,inputY,inputWidth,inputHeight;
let x,y,width,height;

let mainImage;
let input;

const preview = document.querySelector('.js-preview');
const face = document.createElement('canvas');
const faceCxt = face.getContext('2d');

const vContent = document.querySelector('.js-v-preview');
const iContent = document.querySelector('.preview');

// パラメータの取得
var arg = new Object;
var pair=location.search.substring(1).split('&');
for(var i=0;pair[i];i++) {
    var kv = pair[i].split('=');
    arg[kv[0]]=kv[1];
}

// 初期描画
if(arg.type=="image") {
  const img = document.querySelector('#img');
  img.src = arg.url;
  input   = document.querySelector('.js-image-input');

  $(vContent).css({"display": "none" });
  $(document.querySelector('.js-video-input')).css({
    "display": "none"
  });

} else {
  const video = document.querySelector('#video');
  const p = document.querySelector('.preview');
  $(p).css({"display": "none" });
  input   = document.querySelector('.js-video-input');
  if(!!arg.url) {
    video.src = arg.url;
  }

  $(document.querySelector('.js-image-input')).css({
    "display": "none"
  });

  vContent.src = arg.url;
}



// 投稿イメージのpreview表示
function inputImage() {
  return new Promise((resolve)=>{
    input.addEventListener('change', (e)=>{
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (res) => {
        preview.src = res.target.result;
        resolve();
      };
    });
  });
}

// 投稿イメージのトラック
function inputTracker() {
  return new Promise((resolve)=>{
    const tracker = new tracking.ObjectTracker(['face']);
    tracking.track('.js-preview', tracker);
    tracker.on('track', (e)=>{
      const rect = e.data[0];
      console.log(rect);
      inputX=rect.x;inputY=rect.y;
      inputWidth=rect.width;inputHeight=rect.height;
      resolve();
    });
  });
}

// Canvasの作成
function createCanvas() {
  return new Promise((resolve)=>{
    face.width = face.height = inputWidth;
    faceCxt.beginPath();
    faceCxt.arc(65, 65, 45, 0, Math.PI*2, false);
    faceCxt.clip();
    const img = new Image();
    img.src   = preview.src;
    img.onload = ()=>{
      faceCxt
        .drawImage(img, inputX, inputY, inputWidth, inputHeight, 20, 20, 90, 90);
      resolve();
    }
  });
}

function appendCanvas(cont){
  $(face).css({
    "position": "absolute",
    "top": y,
    "left": x,
    "width": width,
    "height": height
  });
  cont.appendChild(face);
}

function videoTracker() {

  const tracker = new tracking.ObjectTracker(['face']);
  tracking.track('#video', tracker);

  tracker.on('track', function(e) {
    const rect = e.data[0];
    console.log(rect);
    if(!rect) {
      x="-5000px";
      appendCanvas(vContent);
      return;
    }
    x=rect.x;y=rect.y;width=rect.width;height=rect.height;
    appendCanvas(vContent);
  });
}

function imageTracker(){ 
  const tracker = new tracking.ObjectTracker(['face']);
  tracking.track(mainImage, tracker);
  console.log('imageTracker');

  tracker.on('track', function(e) {
    const rect = e.data[0];
    console.log(rect);
    x=rect.x;y=rect.y;width=rect.width;height=rect.height;
    appendCanvas(iContent);
  });
}

function imageLoader() {
  return new Promise((resolve)=>{
    const img = new Image();
    const imgEl = document.querySelector('#img');
    img.src = imgEl.src;
    img.onload = () => {
      mainImage = img;
      resolve();
    }
  });
}


// image
window.onload = function() {
  if(arg.type=="image") {
    Promise.resolve()
      .then(inputImage)
      .then(inputTracker)
      .then(imageLoader)
      .then(createCanvas)
      .then(imageTracker);
  } else {
    Promise.resolve()
      .then(inputImage)
      .then(inputTracker)
      .then(createCanvas)
      .then(videoTracker);
  }
};
