class AudioManager {
  constructor() {
    this.audio = typeof window !== "undefined" ? new Audio() : {};
  }
  play = source => {
    try {
      this.audio.src = source;
      this.audio.play();
    } catch (err) {}
  };
}

export default new AudioManager();
