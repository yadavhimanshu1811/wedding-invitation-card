/**
 * THEME TOGGLE CONTROLLER (Night / Light Mode)
 * Persists theme preference in localStorage and synchronizes UI text/icons.
 */

export class ThemeToggle {
  constructor(btnId, textId) {
    this.btn = document.getElementById(btnId);
    this.textEl = document.getElementById(textId);
    this.theme = localStorage.getItem('wedding_theme') || 'light';

    this.init();
  }

  init() {
    // Apply saved theme on start
    this.applyTheme(this.theme);

    if (this.btn) {
      this.btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent opening envelope on click
        this.toggle();
      });
    }
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('wedding_theme', this.theme);
    this.applyTheme(this.theme);
  }

  applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      document.documentElement.classList.add('light-mode');
      if (this.textEl) this.textEl.textContent = 'Night Mode';
      if (this.btn) {
        this.btn.setAttribute('aria-label', 'Switch to Night Mode');
        this.btn.setAttribute('title', 'Switch to Night Mode');
      }
    } else {
      document.body.classList.remove('light-mode');
      document.documentElement.classList.remove('light-mode');
      if (this.textEl) this.textEl.textContent = 'Day Mode';
      if (this.btn) {
        this.btn.setAttribute('aria-label', 'Switch to Day Mode');
        this.btn.setAttribute('title', 'Switch to Day Mode');
      }
    }

    // Trigger custom event in case other components need to react
    window.dispatchEvent(new CustomEvent('weddingThemeChanged', { detail: { theme } }));
  }
}
