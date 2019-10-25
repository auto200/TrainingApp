class CountDownTimer {
  constructor({ tick = 50, tickCallback, timeToElapse, endCallback } = {}) {
    this.tick = tick;
    this.tickCallback = tickCallback;
    if (!timeToElapse) throw new Error("you must specify timeToElapse");
    this.timeToElapse = timeToElapse * 1000;
    this.endCallback = endCallback;
    this.intervalId = null;
    this.endTime = null;
    this.isPaused = true;
  }

  start() {
    if (!this.isPaused) return;
    this.isPaused = false;
    const startTime = Date.now();
    this.endTime = startTime + this.timeToElapse;
    let remainingTime = this.endTime - startTime;
    this.intervalId = setInterval(() => {
      //check if timer should end
      if (this.endTime <= Date.now()) {
        clearInterval(this.intervalId);
        this.isFunction(this.endCallback) && this.endCallback();
        return;
      }
      remainingTime = this.endTime - Date.now();
      this.isFunction(this.tickCallback) && this.tickCallback(remainingTime);
    }, this.tick);
  }
  pause() {
    if (this.isPaused) return;
    this.isPaused = true;
    this.timeToElapse = this.endTime - Date.now();
    clearInterval(this.intervalId);
  }
  get paused() {
    return this.isPaused;
  }

  isFunction(func) {
    if (func && typeof func == "function") return true;
    return false;
  }
}

export default CountDownTimer;
