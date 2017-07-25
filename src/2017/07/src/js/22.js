// fork http://q068891.hatenablog.com/entry/2016/10/02/111033
const canvas = document.getElementsByClassName('day-22')[0];
const ctx    = canvas.getContext('2d');
const width = 600,
      height = 450,
      power = 5.0, // 冪指数
      workerNum = 20, //walkerの数
      workerDistance = 1, // walkerが1回で進む距離
      workerMaxDistance = 1000000000,
      x = new Array(workerNum),
      y = new Array(workerNum),
      workerRadian = new Array(workerNum),
      NumberOfWork = new Array(workerNum),
      colorR = new Array(workerNum),
      colorG = new Array(workerNum),
      colorB = new Array(workerNum);

ctx.strokeStyle = 'rgb(0,0,0)';
ctx.strokeRect(0,0,width, height);

/*
 * 初期位置とcolorの決定
 */

for(let i=0; i<workerNum; i++) {
  // 初期位置
  x[i] = width * Math.random();
  y[i] = height * Math.random();

  NumberOfWork[i] = 0;
  workerRadian[i] = 0;

  //  color
  colorR[i] = Math.floor(Math.random()*256);
  colorG[i] = Math.floor(Math.random()*256);
  colorB[i] = Math.floor(Math.random()*256);
}

function ticker() {
  requestAnimationFrame(ticker);
  // worker の描画
  for (let i=0; i<workerNum; i++) {
    ctx.beginPath();
    ctx.strokeStyle = `rgb(${colorR[i]}, ${colorG[i]}, ${colorB[i]})`;
    ctx.arc(x[i], y[i], 0.05, 0, Math.PI*2,false);
    ctx.stroke();
  }

  // workerの位置情報を更新
  for (let i=0; i<workerNum; i++) {

    if(NumberOfWork[i] <= 0) {
      workerRadian[i] = power*Math.PI*Math.random();

      // 次に進む距離をべき分布からランダムに決定
      const tmp1 = Math.pow(workerDistance,-power);
      const tmp2= Math.pow(width*workerMaxDistance,-power) - tmp1;
      const tmp3 = tmp2 * Math.random() + tmp1;
      NumberOfWork[i] = Math.pow(tmp3, (1.0/-power));
    }
    // 計算した角度に距離分移動
    x[i] = x[i] + workerDistance * Math.cos(workerRadian[i]);
    y[i] = y[i] + workerDistance * Math.sin(workerRadian[i]);
    NumberOfWork[i] = NumberOfWork[i]-1;

    // 周期的境界条件
    if(width <= x[i]) {
      x[i] = x[i] - width;
    }

    if(height <= y[i]) {
      y[i] = y[i] - height;
    }

    if(x[i] <= 0) {
      x[i] = x[i] + width;
    }

    if(y[i] <= 0) {
      y[i] = y[i] + height;
    }
  }



}

ticker();
