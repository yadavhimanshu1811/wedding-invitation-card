/**
 * STARRY SKY & COSMIC BACKGROUND CANVAS
 * Renders twinkling stars, 4-point cross diffraction spikes, subtle nebulae,
 * and occasional gentle shooting stars.
 */

class StarrySky {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.animationFrameId = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createStars();
    this.startShootingStars();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.createStars();
  }

  createStars() {
    this.stars = [];
    // Number of stars scaled to viewport size
    const starCount = Math.floor((this.width * this.height) / 3800);

    for (let i = 0; i < starCount; i++) {
      const isBright = Math.random() < 0.12;
      const isBig = Math.random() < 0.03;
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: isBig ? Math.random() * 1.8 + 1.2 : isBright ? Math.random() * 1.2 + 0.8 : Math.random() * 0.7 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        hasCrossSpikes: isBig || (isBright && Math.random() < 0.4),
        spikeLength: Math.random() * 8 + 5,
        color: Math.random() > 0.85 ? '#e0f2fe' : Math.random() > 0.7 ? '#fef3c7' : '#ffffff'
      });
    }
  }

  startShootingStars() {
    const launchShootingStar = () => {
      const startX = Math.random() * (this.width * 0.8);
      const startY = Math.random() * (this.height * 0.4);
      const length = Math.random() * 140 + 80;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.3; // Approx 45 degrees downward
      const speed = Math.random() * 9 + 11;

      this.shootingStars.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length: length,
        life: 0,
        maxLife: Math.random() * 40 + 50,
        alpha: 1
      });

      // Schedule next shooting star between 4s and 10s
      setTimeout(launchShootingStar, Math.random() * 6000 + 4000);
    };

    setTimeout(launchShootingStar, 2500);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Deep cosmic background gradient
    const bgGradient = this.ctx.createRadialGradient(
      this.width / 2, this.height * 0.4, 20,
      this.width / 2, this.height / 2, Math.max(this.width, this.height)
    );
    bgGradient.addColorStop(0, '#0a0d18');
    bgGradient.addColorStop(0.5, '#05070e');
    bgGradient.addColorStop(1, '#020306');
    this.ctx.fillStyle = bgGradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Subtle blue ethereal vignette borders
    const vignette = this.ctx.createRadialGradient(
      this.width / 2, this.height / 2, Math.min(this.width, this.height) * 0.45,
      this.width / 2, this.height / 2, Math.max(this.width, this.height) * 0.75
    );
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(0.85, 'rgba(5, 12, 32, 0.4)');
    vignette.addColorStop(1, 'rgba(14, 28, 64, 0.6)');
    this.ctx.fillStyle = vignette;
    this.ctx.fillRect(0, 0, this.width, this.height);

    const now = Date.now() * 0.001;

    // Render stars
    for (const star of this.stars) {
      const alpha = Math.max(0.1, Math.min(1, star.baseAlpha + Math.sin(now * 3 + star.twinklePhase) * 0.35));
      
      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = alpha;

      // Draw star body
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Soft glow for brighter stars
      if (star.size > 1.0) {
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
        this.ctx.fillStyle = star.color;
        this.ctx.globalAlpha = alpha * 0.2;
        this.ctx.fill();
      }

      // Draw 4-point cross diffraction spikes for hero stars
      if (star.hasCrossSpikes && alpha > 0.4) {
        const spikeLen = star.spikeLength * (0.8 + 0.3 * Math.sin(now * 4 + star.twinklePhase));
        this.ctx.strokeStyle = star.color;
        this.ctx.lineWidth = 0.75;
        this.ctx.globalAlpha = alpha * 0.6;

        this.ctx.beginPath();
        // Horizontal spike
        this.ctx.moveTo(star.x - spikeLen, star.y);
        this.ctx.lineTo(star.x + spikeLen, star.y);
        // Vertical spike
        this.ctx.moveTo(star.x, star.y - spikeLen);
        this.ctx.lineTo(star.x, star.y + spikeLen);
        this.ctx.stroke();
      }
    }

    // Render shooting stars
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      s.life++;
      s.x += s.dx;
      s.y += s.dy;

      const progress = s.life / s.maxLife;
      s.alpha = Math.sin(progress * Math.PI);

      if (s.life >= s.maxLife) {
        this.shootingStars.splice(i, 1);
        continue;
      }

      const tailX = s.x - (s.dx / Math.hypot(s.dx, s.dy)) * s.length;
      const tailY = s.y - (s.dy / Math.hypot(s.dx, s.dy)) * s.length;

      const grad = this.ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha})`);
      grad.addColorStop(0.3, `rgba(224, 242, 254, ${s.alpha * 0.7})`);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 1.6;
      this.ctx.beginPath();
      this.ctx.moveTo(s.x, s.y);
      this.ctx.lineTo(tailX, tailY);
      this.ctx.stroke();

      // Sparkle at shooting star head
      this.ctx.fillStyle = '#ffffff';
      this.ctx.globalAlpha = s.alpha;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1.0;
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

window.StarrySky = StarrySky;
export { StarrySky };
