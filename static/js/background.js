const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let circles = [];
const circleCount = 50;
const maxRadius = 15;
const minRadius = 5;

let mouse = { x: null, y: null, radius: 100 };

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

class Circle {
  constructor(x, y, radius, color, vx, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.baseRadius = radius;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.fillColor = 'transparent';
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  update() {
    if (this.x + this.radius > width || this.x - this.radius < 0) this.vx = -this.vx;
    if (this.y + this.radius > height || this.y - this.radius < 0) this.vy = -this.vy;

    this.x += this.vx;
    this.y += this.vy;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      this.fillColor = this.color + 'AA';
      this.radius = Math.min(this.baseRadius + 5, maxRadius);
    } else {
      this.fillColor = 'transparent';
      this.radius = this.baseRadius;
    }

    this.draw();
  }
}

function init() {
  circles = [];
  for (let i = 0; i < circleCount; i++) {
    let radius = Math.random() * (maxRadius - minRadius) + minRadius;
    let x = Math.random() * (width - radius * 2) + radius;
    let y = Math.random() * (height - radius * 2) + radius;
    const pastelColors = [
        '#FF8FAB', // rich pink
        '#77DD77', // brighter mint green
        '#9C92E0', // deeper lavender
        '#FFA07A', // soft orange
        '#BA9BC9', // deeper pastel purple
        '#FFB347', // bold peach
        '#FFD700'  // gold yellow
    ];
    let color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      
    let vx = (Math.random() - 0.5) * 0.5;
    let vy = (Math.random() - 0.5) * 0.5;

    circles.push(new Circle(x, y, radius, color, vx, vy));
  }
}
init();

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function animate() {
  ctx.clearRect(0, 0, width, height);
  circles.forEach(circle => circle.update());
  requestAnimationFrame(animate);
}
animate();
