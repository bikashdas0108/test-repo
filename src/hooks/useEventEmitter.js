import eventEmitter from "../eventEmitter";

export const useEventEmitter = (eventName) => {
  const triggerEvent = (data) => {
    eventEmitter.emit(eventName, data);
  };
  const registerEvent = (callback) => {
    eventEmitter.on(eventName, callback);
  };

  return { triggerEvent, registerEvent };
};
