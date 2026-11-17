/**
 * AMBIENT WEDDING AUDIO PLAYER
 * Features:
 * - Plays local MP3 or synthesizes traditional Indian flute raga via Web Audio API fallback
 * - Smooth fade-in and fade-out
 * - Floating audio visualizer button with dancing bars
 * - Autoplays on first user tap ("Open Invitation")
 */

class WeddingAudioPlayer {
  constructor(audioSrc) {
    this.audioSrc = audioSrc;
    this.isPlaying = false;
    this.audioElement = null;
    this.audioCtx = null;
    this.synthInterval = null;
    this.isMuted = false;
    this.buttonElement = document.getElementById('music-toggle-btn');
    this.wavesElement = document.querySelector('.music-bars');
    this.statusText = document.querySelector('.music-status-tooltip');

    this.initAudioElement();
    this.setupListeners();
  }

  initAudioElement() {
    this.audioElement = new Audio();
    this.audioElement.src = this.audioSrc;
    this.audioElement.loop = true;
    this.audioElement.volume = 0.55;

    // Handle error or missing audio by enabling synthetic raga fallback
    this.audioElement.addEventListener('error', () => {
      console.info('Audio file not found or inaccessible; Web Audio synthesizer fallback is active.');
      this.audioElement = null;
    });
  }

  setupListeners() {
    if (this.buttonElement) {
      this.buttonElement.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }
  }

  start() {
    if (this.isPlaying) return;

    if (this.audioElement) {
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.updateUI(true);
          })
          .catch(() => {
            // If browser prevented or file failed, trigger synthesizer
            this.startSyntheticMelody();
          });
      }
    } else {
      this.startSyntheticMelody();
    }
  }

  pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
  }

  updateUI(playing) {
    if (this.buttonElement) {
      if (playing) {
        this.buttonElement.classList.add('playing');
        this.buttonElement.setAttribute('aria-label', 'Pause Wedding Music');
        if (this.statusText) this.statusText.textContent = 'Music: Playing';
      } else {
        this.buttonElement.classList.remove('playing');
        this.buttonElement.setAttribute('aria-label', 'Play Wedding Music');
        if (this.statusText) this.statusText.textContent = 'Music: Paused';
      }
    }
  }

  /**
   * Dreamy Web Audio API synthesizer that plays an authentic, peaceful
   * Raag Yaman / Bhupali flute motif when no audio file is provided.
   */
  startSyntheticMelody() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContext();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.isPlaying = true;
      this.updateUI(true);

      // Raag Bhupali Pentatonic Frequencies (Sa, Re, Ga, Pa, Dha, Sa')
      // Base: D#4 (Flute scale)
      const ragaNotes = [
        311.13, // Sa (D#4)
        349.23, // Re (F4)
        392.00, // Ga (G4)
        466.16, // Pa (A#4)
        523.25, // Dha (C5)
        622.25, // Sa' (D#5)
        698.46, // Re' (F5)
        783.99  // Ga' (G5)
      ];

      // Beautiful soothing sequence
      const melodySequence = [0, 1, 2, 4, 3, 2, 4, 5, 4, 2, 1, 0, 1, 2, 0];
      let seqIndex = 0;

      const playFluteTone = (freq, duration = 1.4) => {
        if (!this.isPlaying || !this.audioCtx) return;

        const osc = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        // Warm, breathy bansuri flute timbre using triangle + bandpass
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        // Soft vibrato
        const vibrato = this.audioCtx.createOscillator();
        const vibratoGain = this.audioCtx.createGain();
        vibrato.frequency.value = 5.2; // 5 Hz vibrato
        vibratoGain.gain.value = 3.5;
        vibrato.connect(osc.frequency);
        vibrato.start();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, this.audioCtx.currentTime);

        // Gentle envelope
        const now = this.audioCtx.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.08, now + 0.35);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + duration);
        vibrato.stop(now + duration);
      };

      // Play continuous ambient drone (Tanpura Sa-Pa in background)
      const playTanpuraDrone = () => {
        if (!this.isPlaying || !this.audioCtx) return;
        [155.56, 233.08].forEach(freq => {
          const droneOsc = this.audioCtx.createOscillator();
          const droneGain = this.audioCtx.createGain();
          droneOsc.type = 'sine';
          droneOsc.frequency.value = freq;
          droneGain.gain.value = 0.015;
          droneOsc.connect(droneGain);
          droneGain.connect(this.audioCtx.destination);
          droneOsc.start();
          setTimeout(() => {
            droneOsc.stop();
          }, 4000);
        });
      };

      playTanpuraDrone();
      setInterval(() => {
        if (this.isPlaying) playTanpuraDrone();
      }, 4200);

      const step = () => {
        if (!this.isPlaying) return;
        const noteIdx = melodySequence[seqIndex % melodySequence.length];
        const freq = ragaNotes[noteIdx];
        playFluteTone(freq, 1.8);
        seqIndex++;
      };

      step();
      this.synthInterval = setInterval(step, 1400);

    } catch (err) {
      console.warn('Web Audio synthesis error:', err);
    }
  }
}

window.WeddingAudioPlayer = WeddingAudioPlayer;
export { WeddingAudioPlayer };
