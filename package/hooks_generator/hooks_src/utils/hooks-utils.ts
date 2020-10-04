// Debounce helper function

// dummyParam to turn param to variable in test

export const debounce = (func: (...args: any[]) => any, wait: number) => {
  let timeout: any;

  return (...args: any[]) => {
    const timeoutCallback = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(timeoutCallback, wait);
  };
};