/**
 * LIVE WEDDING COUNTDOWN TIMER
 */

class WeddingCountdown {
  constructor(targetDateStr) {
    this.targetDate = new Date(targetDateStr).getTime();
    this.daysEl = document.getElementById('cd-days');
    this.hoursEl = document.getElementById('cd-hours');
    this.minutesEl = document.getElementById('cd-minutes');
    this.secondsEl = document.getElementById('cd-seconds');
    this.interval = null;

    this.start();
  }

  start() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance <= 0) {
      if (this.daysEl) this.daysEl.textContent = '00';
      if (this.hoursEl) this.hoursEl.textContent = '00';
      if (this.minutesEl) this.minutesEl.textContent = '00';
      if (this.secondsEl) this.secondsEl.textContent = '00';
      clearInterval(this.interval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => (n < 10 ? '0' + n : String(n));

    if (this.daysEl && this.daysEl.textContent !== pad(days)) {
      this.animateFlip(this.daysEl, pad(days));
    }
    if (this.hoursEl && this.hoursEl.textContent !== pad(hours)) {
      this.animateFlip(this.hoursEl, pad(hours));
    }
    if (this.minutesEl && this.minutesEl.textContent !== pad(minutes)) {
      this.animateFlip(this.minutesEl, pad(minutes));
    }
    if (this.secondsEl && this.secondsEl.textContent !== pad(seconds)) {
      this.animateFlip(this.secondsEl, pad(seconds));
    }
  }

  animateFlip(el, val) {
    el.classList.add('updating');
    el.textContent = val;
    setTimeout(() => {
      el.classList.remove('updating');
    }, 200);
  }
}

window.WeddingCountdown = WeddingCountdown;
export { WeddingCountdown };
