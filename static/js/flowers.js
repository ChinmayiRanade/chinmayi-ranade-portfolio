const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let flowers = [];
const flowerCount = 40;  // fewer flowers for elegance

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

// Colors: Gold and Purple pastel variants
const colors = ['#a678e4', '#d4af37', '#c6a0ff', '#d4c06d', '#b491ff'];

class Flower {
  constructor(x, y, radius, petalCount, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.petalCount = petalCount;
    this.color = color;

    this.angle = Math.random() * Math.PI * 2; // rotation angle
    this.angleSpeed = (Math.random() - 0.5) * 0.002; // slow rotation speed

    this.petalPulse = 0; // pulse phase
    this.petalPulseSpeed = 0.02 + Math.random() * 0.02;
  }

  drawPetal(cx, cy, angle, length, width, color, opacity) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(width / 2, -length / 2, width / 2, -length, 0, -length);
    ctx.bezierCurveTo(-width / 2, -length, -width / 2, -length / 2, 0, 0);
    ctx.fillStyle = `rgba(${hexToRgb(color)}, ${opacity})`;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    const pulseScale = 0.85 + 0.15 * Math.sin(this.petalPulse);
    const petalLength = this.radius * pulseScale;
    const petalWidth = this.radius * 0.3 * pulseScale;
    const opacity = 0.7;

    for (let i = 0; i < this.petalCount; i++) {
      const angle = (i * (2 * Math.PI)) / this.petalCount;
      this.drawPetal(0, 0, angle, petalLength, petalWidth, this.color, opacity);
    }

    // Draw center circle
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;
    ctx.arc(0, 0, this.radius * 0.3 * pulseScale, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  update() {
    this.angle += this.angleSpeed;
    this.petalPulse += this.petalPulseSpeed;
    this.draw();
  }
}

function init() {
  flowers = [];
  for (let i = 0; i < flowerCount; i++) {
    const radius = 15 + Math.random() * 30;
    const x = Math.random() * (width - radius * 2) + radius;
    const y = Math.random() * (height - radius * 2) + radius;
    const petalCount = 5 + Math.floor(Math.random() * 3); // 5-7 petals
    const color = colors[Math.floor(Math.random() * colors.length)];

    flowers.push(new Flower(x, y, radius, petalCount, color));
  }
}
init();

function animate() {
  ctx.clearRect(0, 0, width, height);
  flowers.forEach(flower => flower.update());
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
