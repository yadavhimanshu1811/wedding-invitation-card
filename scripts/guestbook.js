/**
 * BLESSINGS WALL / GUESTBOOK
 */

class Guestbook {
  constructor(config) {
    this.config = config;
    this.guestbookContainer = document.getElementById('wishes-list');

    this.render();
  }

  render() {
    if (!this.guestbookContainer) return;

    const savedWishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
    const allWishes = [...savedWishes, ...(this.config.initialWishes || [])];

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
}

window.Guestbook = Guestbook;
export { Guestbook };
