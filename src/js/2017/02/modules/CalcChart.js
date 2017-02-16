const CalcChart = {
  corner:  {
    A: -135,
    B: -45,
    C: 45,
    D: 135
  },
  calcPointY: (distance, radian) => {
    return distance * Math.sin(radian);
  },
  calcPointX: (distance, radian) => {
    return distance * Math.cos(radian);
  },
  // 対角線の長さ √(AD^2 + AB ^2 )
  diagonalLine: (width,height) => {
    return Math.sqrt(Math.pow(width,2)+Math.pow(height,2));
  },
  toRadian: (degree) => {
    return degree * Math.PI / 180;
  },
  toDegree: (radian) => {
    return radian * 180 / Math.PI;
  },
  truncatePoint: (n) =>{
    return Math.floor(n*10)/10;
  },
  rotating: (x,y) => {
    return Math.atan2(y,x); // 対象点とmouseの角度 (radian)
  }
};

module.exports = CalcChart;
