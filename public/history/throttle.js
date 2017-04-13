const throttle = (cb, limit) => {
  let wait = false;
  return function(...args) {
    if (!wait) {
      cb(args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
};

export default throttle;
