class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    console.log(this.events);
  }

  emit(eventName, data) {
    console.log(this.events);
    if (this.events[eventName].length) {
      this.events[eventName].forEach((callback) => callback(data));
    }
  }
}

const eventEmitter = new EventEmitter();

export default eventEmitter;
