/**
 * 3D COVERFLOW GALLERY CAROUSEL
 * Features:
 * - 3D depth perspective and scale transformation
 * - Glowing gold frame on active slide
 * - Previous & Next buttons + dot indicators
 * - Touch swipe & desktop mouse drag
 * - Lightbox modal view for full-screen inspection
 */

class WeddingCarousel {
  constructor(containerId, slidesData) {
    this.container = document.getElementById(containerId);
    this.slidesData = slidesData || [];
    this.currentIndex = 0;
    this.track = null;
    this.dotsContainer = null;
    this.startX = 0;
    this.isDragging = false;

    if (!this.container) return;
    this.init();
  }

  init() {
    this.render();
    this.setupLightbox();
    this.updateSlides();

    // Event listeners
    const prevBtn = document.getElementById('gallery-prev-btn');
    const nextBtn = document.getElementById('gallery-next-btn');

    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Touch swipe
    this.container.addEventListener('touchstart', (e) => {
      this.startX = e.touches[0].clientX;
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = this.startX - endX;
      if (diff > 45) {
        this.next();
      } else if (diff < -45) {
        this.prev();
      }
    }, { passive: true });

    // Resize handling
    window.addEventListener('resize', () => this.updateSlides());
  }

  render() {
    this.container.innerHTML = `
      <div class="carousel-stage">
        <div class="carousel-track" id="carousel-track">
          ${this.slidesData.map((item, index) => `
            <div class="carousel-card" data-index="${index}">
              <div class="card-inner">
                <img src="${item.image}" alt="${item.caption}" loading="lazy" />
                <div class="card-overlay">
                  <p class="card-caption">${item.caption}</p>
                  <span class="card-subtitle">${item.subtitle || ''}</span>
                  <button class="expand-btn" aria-label="View photo">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="carousel-controls">
        <button class="control-arrow prev" id="gallery-prev-btn" aria-label="Previous Photo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="carousel-dots" id="carousel-dots">
          ${this.slidesData.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
        </div>
        <button class="control-arrow next" id="gallery-next-btn" aria-label="Next Photo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    `;

    this.track = document.getElementById('carousel-track');
    this.dotsContainer = document.getElementById('carousel-dots');

    // Click on slide
    const cards = this.container.querySelectorAll('.carousel-card');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        const index = parseInt(card.getAttribute('data-index'), 10);
        if (index === this.currentIndex) {
          this.openLightbox(index);
        } else {
          this.goTo(index);
        }
      });
    });

    // Dot clicks
    const dots = this.dotsContainer.querySelectorAll('.dot');
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'), 10);
        this.goTo(index);
      });
    });
  }

  updateSlides() {
    const cards = this.container.querySelectorAll('.carousel-card');
    const total = this.slidesData.length;
    const isMobile = window.innerWidth <= 600;
    const transOffset = isMobile ? 48 : 65;
    const scaleFactor = isMobile ? 0.78 : 0.82;
    const rotAngle = isMobile ? 10 : 15;

    cards.forEach((card, idx) => {
      let offset = idx - this.currentIndex;

      card.classList.remove('active', 'left-1', 'left-2', 'right-1', 'right-2', 'hidden');

      if (offset === 0) {
        card.classList.add('active');
        card.style.transform = `translateX(0) scale(1) translateZ(0)`;
        card.style.zIndex = '10';
        card.style.opacity = '1';
      } else if (offset === -1 || (offset === total - 1 && total > 2)) {
        card.classList.add('left-1');
        card.style.transform = `translateX(-${transOffset}%) scale(${scaleFactor}) rotateY(${rotAngle}deg)`;
        card.style.zIndex = '5';
        card.style.opacity = isMobile ? '0.35' : '0.55';
      } else if (offset === 1 || (offset === -(total - 1) && total > 2)) {
        card.classList.add('right-1');
        card.style.transform = `translateX(${transOffset}%) scale(${scaleFactor}) rotateY(-${rotAngle}deg)`;
        card.style.zIndex = '5';
        card.style.opacity = isMobile ? '0.35' : '0.55';
      } else {
        card.classList.add('hidden');
        card.style.opacity = '0';
        card.style.zIndex = '1';
        card.style.transform = offset < 0 ? `translateX(-120%) scale(0.6)` : `translateX(120%) scale(0.6)`;
      }
    });

    // Update dots
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === this.currentIndex);
      });
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slidesData.length;
    this.updateSlides();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slidesData.length) % this.slidesData.length;
    this.updateSlides();
  }

  goTo(index) {
    this.currentIndex = index;
    this.updateSlides();
  }

  setupLightbox() {
    let modal = document.getElementById('lightbox-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lightbox-modal';
      modal.className = 'lightbox-modal';
      modal.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-content">
          <button class="lightbox-close" id="lightbox-close" aria-label="Close">✕</button>
          <img class="lightbox-img" id="lightbox-img" src="" alt="Full size photo" />
          <p class="lightbox-caption" id="lightbox-caption"></p>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('.lightbox-backdrop').addEventListener('click', () => {
        modal.classList.remove('open');
      });
      document.getElementById('lightbox-close').addEventListener('click', () => {
        modal.classList.remove('open');
      });
    }
  }

  openLightbox(index) {
    const item = this.slidesData[index];
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    if (modal && img && item) {
      img.src = item.image;
      caption.textContent = item.caption;
      modal.classList.add('open');
    }
  }
}

window.WeddingCarousel = WeddingCarousel;
export { WeddingCarousel };
