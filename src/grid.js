class MatrixDollar {
  constructor(x, col) {
    this.x = x;
    this.y = -25;
    this.col = col;
    this.speed = 2 + Math.random() * 2;
    this.opacity = 0.2 + Math.random() * 0.8;
    this.brightness = Math.random();
  }

  update(height) {
    this.y += this.speed;
    if (this.y > height) {
      this.y = -25;
      this.speed = 2 + Math.random() * 2;
      this.opacity = 0.2 + Math.random() * 0.8;
      this.brightness = Math.random();
    }
  }
}

class MatrixGrid {
  constructor() {
    this.canvas = document.getElementById('dollarGrid');
    this.ctx = this.canvas.getContext('2d');
    this.columns = [];
    this.setup();
    this.animate();
  }

  setup() {
    const cols = 32;
    const rows = 40;
    const spacing = 25;

    // Create columns of dollars
    for (let col = 0; col < cols; col++) {
      const dollars = [];
      for (let row = 0; row < rows; row++) {
        dollars.push(new MatrixDollar(
          col * spacing + spacing,
          col
        ));
        // Stagger initial positions
        dollars[row].y = (row * spacing + spacing) - (Math.random() * this.canvas.height);
      }
      this.columns.push(dollars);
    }
  }

  draw() {
    // Semi-transparent black for trail effect
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.font = '18px "Arial Black"';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    // Draw each dollar in each column
    this.columns.forEach(column => {
      column.forEach(dollar => {
        // Calculate color based on brightness and opacity
        const brightness = Math.floor(dollar.brightness * 255);
        this.ctx.fillStyle = `rgba(0, ${brightness + 200}, ${brightness + 180}, ${dollar.opacity})`;
        this.ctx.fillText('$', dollar.x, dollar.y);
      });
    });
  }

  update() {
    this.columns.forEach(column => {
      column.forEach(dollar => {
        dollar.update(this.canvas.height);
      });
    });
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Create dark background
const canvas = document.getElementById('dollarGrid');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#0a0a0a';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Start animation
new MatrixGrid();