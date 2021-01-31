//Custom debouncing
export function debounce(fn, delay, maxDelay = 3000) {
  let timer;
  let maxTimer;
  let args;

  let clearTimers = function () {
    if (timer) clearTimeout(timer);
    if (maxTimer) clearTimeout(maxTimer);
  };

  let doCallFn = function () {
    clearTimers();
    fn.apply(undefined, [].slice(args));
  };

  let debounced = function () {
    args = arguments;
    // Reset the timer
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(doCallFn, delay);

    if (!maxTimer) {
      maxTimer = setTimeout(doCallFn, maxDelay);
    }
  };

  // Forces a call
  debounced.flush = doCallFn;

  return debounced;
}