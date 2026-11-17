/**
 * INTERACTIVE PULL-OUT SAVE THE DATE CARD
 * Handles the tactile physical pull card / pocket sleeve interaction
 */

class PullCard {
  constructor(pocketId, cardId, hintId) {
    this.pocket = document.getElementById(pocketId);
    this.card = document.getElementById(cardId);
    this.hint = document.getElementById(hintId);
    this.isPulled = false;

    if (!this.pocket || !this.card) return;
    this.init();
  }

  init() {
    this.pocket.addEventListener('click', () => this.toggle());

    // Support drag / swipe up & down on touch devices
    let startY = 0;
    this.pocket.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    }, { passive: true });

    this.pocket.addEventListener('touchend', (e) => {
      const endY = e.changedTouches[0].clientY;
      const deltaY = startY - endY;
      if (deltaY > 30 && !this.isPulled) {
        this.open();
      } else if (deltaY < -30 && this.isPulled) {
        this.close();
      }
    }, { passive: true });
  }

  toggle() {
    if (this.isPulled) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isPulled = true;
    this.card.classList.add('pulled');
    this.pocket.classList.add('active');
    if (this.hint) {
      this.hint.textContent = 'TAP TO CLOSE CARD';
    }
  }

  close() {
    this.isPulled = false;
    this.card.classList.remove('pulled');
    this.pocket.classList.remove('active');
    if (this.hint) {
      this.hint.textContent = 'PULL THE CARD TO SEE THE DATE';
    }
  }
}

window.PullCard = PullCard;
export { PullCard };
