const debouncePromise = (fn, delay) => {
  let timeoutId = null;

  return new Promise((resolve) => {
    (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
  }
};

const fn = (arg) => {
  console.log(arg);
  new Promise((resolve) => {
    setTimeout(resolve, 1000, ["resolved", arg]);
  });
};

const debounced = debouncePromise(fn, 200);
debounced("foo");
debounced("bar");
