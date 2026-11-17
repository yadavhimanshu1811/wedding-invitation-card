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
                <img src="${item.image}" alt="${item.caption || 'Wedding Photo'}" loading="lazy" />
                <div class="card-overlay">
                  <p class="card-caption">${item.caption || ''}</p>
                  <span class="card-subtitle">${item.subtitle || ''}</span>
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
      card.addEventListener('click', () => {
        const index = parseInt(card.getAttribute('data-index'), 10);
        if (index !== this.currentIndex) {
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
    const transOffset = isMobile ? 54 : 62;
    const scaleFactor = isMobile ? 0.82 : 0.85;
    const sideOpacity = isMobile ? '0.65' : '0.55';

    cards.forEach((card, idx) => {
      let diff = idx - this.currentIndex;
      // Circular wrap into [-total/2, total/2] to ensure all cards slide unidirectionally
      while (diff > total / 2) diff -= total;
      while (diff < -total / 2) diff += total;

      card.classList.remove('active', 'left-1', 'right-1', 'hidden');

      if (diff === 0) {
        card.classList.add('active');
        card.style.transform = 'translateX(0) scale(1)';
        card.style.zIndex = '10';
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
      } else if (diff === -1) {
        card.classList.add('left-1');
        card.style.transform = `translateX(-${transOffset}%) scale(${scaleFactor})`;
        card.style.zIndex = '5';
        card.style.opacity = sideOpacity;
        card.style.pointerEvents = 'auto';
      } else if (diff === 1) {
        card.classList.add('right-1');
        card.style.transform = `translateX(${transOffset}%) scale(${scaleFactor})`;
        card.style.zIndex = '5';
        card.style.opacity = sideOpacity;
        card.style.pointerEvents = 'auto';
      } else {
        card.classList.add('hidden');
        card.style.transform = diff < 0 ? 'translateX(-120%) scale(0.7)' : 'translateX(120%) scale(0.7)';
        card.style.zIndex = '1';
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
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

}

window.WeddingCarousel = WeddingCarousel;
export { WeddingCarousel };
