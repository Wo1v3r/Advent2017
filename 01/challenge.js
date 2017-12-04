const input = require('./input');

const stepOne = (cap, index) => cap[(index + 1) % cap.length];
const stepTwo = (cap, index) => cap[(index + cap.length / 2) % cap.length];

const captchaSolver = (captcha,step) =>
  captcha
    .split('')
    .map((val, index, cap) => {
      const matchingVal = step(cap,index);
      return val === matchingVal ? parseInt(val) : 0;
    })
    .reduce((p, c) => c = p + c, 0);

console.log('Step 1:', captchaSolver(input,stepOne));
console.log('Step 2:', captchaSolver(input,stepTwo));
