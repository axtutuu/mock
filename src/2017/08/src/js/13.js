/*
 * forked : https://codepen.io/paultrone/pen/XbLWMj
 */
class Sphere3D {
  constructor(radius) {
    this.radius = radius;
    this.point  = new Array();
    this.color  = 'rgb(100, 255, 0)';

    this.numberOfVertexes = 0;

    this.setPointAlpha();
    this.setPointBeta();
  }

  setPointAlpha() {
    for(let alpha=0; alpha<=6.28; alpha += 0.17) {
      const p = this.point[this.numberOfVertexes] = new Point3D();

      p.x = Math.cos(alpha) * this.radius;
      p.y = 0;
      p.z = Math.sin(alpha) * this.radius;
      this.numberOfVertexes++;
    }
  }

  setPointBeta() {
    for(let direction = 1; direction >= -1; direction -= 2) {
      for(let beta=0.19; beta< 1.445; beta += 0.17) {
        const redius = Math.cos(beta) * this.radius;
        const fixedY = Math.sin(beta) * this.radius * direction;

        for(let alpha=0; alpha < 6.28; alpha += 0.17) {
          const p = this.point[this.numberOfVertexes] = new Point3D();
          p.x = Math.cos(alpha) * redius;
          p.y = fixedY;
          p.z = Math.sin(alpha) * redius;

          this.numberOfVertexes++;
        }
      }
    }
  }

}

function rotateX(p, radians) {
  const y = p.y;
  p.y = (y * Math.cos(radians)) + (p.z * Math.sin(radians) * -1.0);
  p.z = (y * Math.sin(radians)) + (p.z * Math.cos(radians));
}

function rotateY(p, radians) {
  const x = p.x;
  p.x = (x * Math.cos(radians)) + (p.z * Math.sin(radians) * -1.0);
  p.z = (x * Math.sin(radians)) + (p.z * Math.cos(radians));
}

function rotateZ(p, radians) {
  const x = p.x;
  p.x = (x * Math.cos(radians)) + (p.y * Math.sin(radians) * -1.0);
  p.y = (x * Math.sin(radians)) + (p.y * Math.cos(radians));
}

function projection(xy, z, xyOffset, zOffset, distance) {
  return ((distance*xy) / (z-zOffset)) + xyOffset;
}

function drawPoint(ctx, x, y, size, color) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, size, 0, 2 * Math.PI, true);
  ctx.fill();
  ctx.restore();
}

function update() {
  ctx.save();
  ctx.clearRect(0,0,canvas.width, canvas.height);

  for(let i = 0; sphere.numberOfVertexes; i++) {
    const p = {};
		console.log(i, sphere.point.length, sphere.point[i]);

    p.x = sphere.point[i].x;
    p.y = sphere.point[i].y;
    p.z = sphere.point[i].z;

    rotateX(p, Math.sin(+new Date / 360));
    rotateY(p, Math.cos(+new Date / 360));

    const x = projection(p.x, p.z, canvas.width / 2.0, 100.0, distance);
    const y = projection(p.y, p.z, canvas.height / 2.0, 100.0, distance);

    if ((x >= 0) && (x < canvas.width)) {
      if ((y >= 0) && (y < canvas.height)) {
        if (p.z < 0) {
          drawPoint(ctx, x, y, 1, "rgba(200,200,200,0.6)");
        }
      }
    }
  }
  ctx.restore();
}

function Point3D() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
}

const canvas = document.querySelector('.canvas'),
      ctx    = canvas.getContext('2d'),
      distance = 300,
      sphere = new Sphere3D(40);

canvas.width = 800;
canvas.height = 600;
update();
