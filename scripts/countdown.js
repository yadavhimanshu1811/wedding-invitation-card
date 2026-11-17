/**
 * LIVE WEDDING COUNTDOWN TIMER & CALENDAR GENERATOR
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

  static generateGoogleCalendarUrl(title, details, location, startDate, endDate) {
    const formatTime = (d) => new Date(d).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const startStr = formatTime(startDate);
    const endStr = endDate ? formatTime(endDate) : formatTime(new Date(new Date(startDate).getTime() + 4 * 3600000));
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${startStr}/${endStr}`;
  }

  static downloadICS(title, description, location, startDate) {
    const formatTime = (d) => new Date(d).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const start = formatTime(startDate);
    const end = formatTime(new Date(new Date(startDate).getTime() + 5 * 3600000));

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Invitation//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

window.WeddingCountdown = WeddingCountdown;
export { WeddingCountdown };
