class MatrixRain {
  constructor() {
    this.container = document.getElementById('container');
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('viewBox', '0 0 800 1000');
    this.container.appendChild(this.svg);
    
    this.init();
  }

  init() {
    const cols = 32;
    const rows = 40;
    const spacing = 25;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        symbol.textContent = '$';
        symbol.setAttribute('x', (col * spacing + spacing).toString());
        symbol.setAttribute('y', '0');
        symbol.classList.add('matrix-symbol');
        
        // Much slower animations with longer delays
        const fallDuration = 8 + Math.random() * 4; // 8-12 seconds
        const glowDuration = 6 + Math.random() * 3; // 6-9 seconds
        const delay = Math.random() * -8; // More spread out starts
        
        symbol.style.animation = `
          fall ${fallDuration}s linear infinite ${delay}s,
          glow ${glowDuration}s ease-in-out infinite ${Math.random() * -6}s
        `;

        this.svg.appendChild(symbol);
      }
    }
  }
}

// Initialize the animation
new MatrixRain();