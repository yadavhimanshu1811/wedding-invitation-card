/**
 * RSVP MODAL, CELEBRATORY CONFETTI & BLESSINGS WALL
 */

class RsvpGuestbook {
  constructor(config) {
    this.config = config;
    this.modal = document.getElementById('rsvp-modal');
    this.form = document.getElementById('rsvp-form');
    this.guestbookContainer = document.getElementById('wishes-list');
    this.confettiCanvas = document.getElementById('confetti-canvas');

    this.init();
  }

  init() {
    this.setupModal();
    this.setupForm();
    this.renderGuestbook();
  }

  setupModal() {
    const openBtns = document.querySelectorAll('.open-rsvp-btn');
    const closeBtn = document.getElementById('close-rsvp-btn');
    const backdrop = document.querySelector('.rsvp-backdrop');

    openBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.modal) {
          this.modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }
    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeModal());
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove('open');
      document.body.style.overflow = '';
      const successState = document.getElementById('rsvp-success-state');
      if (successState) successState.style.display = 'none';
      if (this.form) this.form.style.display = 'block';
    }
  }

  setupForm() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(this.form);
      const name = formData.get('guestName');
      const phone = formData.get('guestPhone');
      const attendance = formData.get('attendance');
      const guestCount = formData.get('guestCount') || '1';
      const events = formData.getAll('events');
      const food = formData.get('foodPref') || 'Vegetarian';
      const message = formData.get('blessings');

      const rsvpEntry = {
        name,
        phone,
        attendance,
        guestCount,
        events,
        food,
        message,
        timestamp: new Date().toISOString()
      };

      // Store in localStorage
      const savedRSVPs = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      savedRSVPs.push(rsvpEntry);
      localStorage.setItem('wedding_rsvps', JSON.stringify(savedRSVPs));

      // If message provided, post to wishes list
      if (message && message.trim()) {
        const savedWishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
        savedWishes.unshift({
          name: name,
          message: message,
          date: 'Just now'
        });
        localStorage.setItem('wedding_wishes', JSON.stringify(savedWishes));
        this.renderGuestbook();
      }

      // Trigger celebration confetti
      this.triggerConfetti();

      // Show success screen
      this.showSuccess(name, attendance, rsvpEntry);
    });
  }

  showSuccess(name, attendance, rsvpData) {
    if (this.form) this.form.style.display = 'none';
    const successState = document.getElementById('rsvp-success-state');
    const guestNameEl = document.getElementById('success-guest-name');
    const whatsappBtn = document.getElementById('whatsapp-rsvp-btn');

    if (guestNameEl) guestNameEl.textContent = name;

    if (whatsappBtn && this.config.rsvp.whatsappNumber) {
      const waMsg = encodeURIComponent(
        `Namaste! RSVP from ${name} (${rsvpData.guestCount} guest(s)) for ${this.config.couple.groom.firstName} & ${this.config.couple.bride.firstName}'s wedding.\nStatus: ${attendance}\nEvents: ${rsvpData.events.join(', ')}\nDiet: ${rsvpData.food}\nWishes: ${rsvpData.message || 'Best regards'}`
      );
      whatsappBtn.href = `https://wa.me/${this.config.rsvp.whatsappNumber}?text=${waMsg}`;
    }

    if (successState) {
      successState.style.display = 'block';
    }
  }

  renderGuestbook() {
    if (!this.guestbookContainer) return;

    const savedWishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
    const allWishes = [...savedWishes, ...this.config.initialWishes];

    this.guestbookContainer.innerHTML = allWishes.map(wish => `
      <div class="wish-card">
        <div class="wish-header">
          <span class="wish-author">${wish.name}</span>
          <span class="wish-date">${wish.date}</span>
        </div>
        <p class="wish-text">"${wish.message}"</p>
        <div class="wish-accent">✦</div>
      </div>
    `).join('');
  }

  /**
   * Luxury golden & rose petal confetti shower
   */
  triggerConfetti() {
    if (!this.confettiCanvas) return;
    const canvas = this.confettiCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    const particles = [];
    const colors = ['#E5C158', '#FDE047', '#D4AF37', '#F43F5E', '#FB7185', '#FFF3C4'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 80,
        y: canvas.height * 0.45,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        shape: Math.random() > 0.4 ? 'petal' : 'goldSquare'
      });
    }

    let animationId;
    const startTime = Date.now();

    const animateConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = Date.now() - startTime;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.vx *= 0.98; // air drag
        p.rotation += p.rotationSpeed;

        if (elapsed > 2000) {
          p.opacity -= 0.02;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        if (p.shape === 'petal') {
          // Curved petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Gold metallic square
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
        ctx.restore();
      }

      if (elapsed < 3500) {
        animationId = requestAnimationFrame(animateConfetti);
      } else {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
      }
    };

    animateConfetti();
  }
}

window.RsvpGuestbook = RsvpGuestbook;
export { RsvpGuestbook };
