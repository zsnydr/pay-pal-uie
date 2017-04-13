const debounce = (func, wait, immediate) => {
  let timeout;
  return function(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) {
        func(args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func(args);
    }
  };
};

export default debounce;
