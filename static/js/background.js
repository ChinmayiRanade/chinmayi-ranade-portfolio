const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let lines = [];
const lineCount = 50;

let mouse = { x: null, y: null, radius: 120 };

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

class Line {
  constructor(x1, y1, x2, y2, color, vx, vy) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.baseColor = color;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1.5;
  
    // 🔵 soft outer blue glow for all lines
    ctx.shadowColor = this.color;
    ctx.shadowBlur  = 6;
  
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
  
    // reset shadow so only lines glow
    ctx.shadowBlur = 0;
  }
  

  update() {
    this.x1 += this.vx;
    this.x2 += this.vx;
    this.y1 += this.vy;
    this.y2 += this.vy;

    if (this.x1 < 0 || this.x1 > width || this.x2 < 0 || this.x2 > width) this.vx = -this.vx;
    if (this.y1 < 0 || this.y1 > height || this.y2 < 0 || this.y2 > height) this.vy = -this.vy;

    const midX = (this.x1 + this.x2) / 2;
    const midY = (this.y1 + this.y2) / 2;
    const dx = mouse.x - midX;
    const dy = mouse.y - midY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      this.color = '#FFD700'; // gold when hovered
    } else {
      this.color = this.baseColor;
    }

    this.draw();
  }
}

function init() {
  lines = [];
  // const colors = ['#3A5BA0', '#507DCA', '#7DA2F2', '#1E3A8A', '#8CB0FF'];
  const colors = ['#9b5de5', '#c77dff', '#00f5d4', '#845ec2', '#7afcff'];


  for (let i = 0; i < lineCount; i++) {
    const x1 = Math.random() * width;
    const y1 = Math.random() * height;
    const x2 = x1 + Math.random() * 60 - 30;
    const y2 = y1 + Math.random() * 60 - 30;

    const color = colors[Math.floor(Math.random() * colors.length)];
    const vx = (Math.random() - 0.5) * 0.2;
    const vy = (Math.random() - 0.5) * 0.2;

    lines.push(new Line(x1, y1, x2, y2, color, vx, vy));
  }
}
init();

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function animate() {
  ctx.clearRect(0, 0, width, height);
  lines.forEach(line => line.update());
  requestAnimationFrame(animate);
}
animate();
