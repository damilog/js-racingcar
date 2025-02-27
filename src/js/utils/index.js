export const generateNumberInRange = ({ min, max }) => {
  return Math.floor(Math.random() * (max + 1)) + min;
};

export const updateInterval = ({ fn, endFn, interval, times }) => {
  const timer = count => {
    setTimeout(() => {
      if (count >= times) {
        return endFn();
      }

      fn();
      timer(count + 1);
    }, interval);
  };
  timer(0);
};
