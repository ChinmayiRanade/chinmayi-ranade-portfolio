const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let circles = [];
const circleCount = 60;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

const colors = [
    '#d4af37', // soft gold
    '#e6c97e', // light gold
    '#9b5de5', // vibrant purple (same as --primary-600)
    '#a678e4', // muted purple
    '#cbb5f4'  // pastel lavender
  ];
  

class Circle {
  constructor(x, y, radius, color, vx, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.baseColor = color;
    this.vx = vx;
    this.vy = vy;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(${hexToRgb(this.baseColor)}, 0.25)`;
    ctx.shadowColor = this.baseColor;
    ctx.shadowBlur = 10;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x - this.radius < 0 || this.x + this.radius > width) this.vx = -this.vx;
    if (this.y - this.radius < 0 || this.y + this.radius > height) this.vy = -this.vy;

    this.draw();
  }
}

function init() {
  circles = [];
  for (let i = 0; i < circleCount; i++) {
    const radius = Math.random() * 40 + 10;
    const x = Math.random() * (width - radius * 2) + radius;
    const y = Math.random() * (height - radius * 2) + radius;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const vx = (Math.random() - 0.5) * 0.25;
    const vy = (Math.random() - 0.5) * 0.25;

    circles.push(new Circle(x, y, radius, color, vx, vy));
  }
}
init();

function animate() {
  ctx.clearRect(0, 0, width, height);
  circles.forEach(circle => circle.update());
  requestAnimationFrame(animate);
}
animate();

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}