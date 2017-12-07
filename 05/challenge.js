const input = require('./input');

const checkSteps = (input,step2)  => {
  let index = 0, steps = 0;

  while (index < input.length && index >= 0 ) {
    steps++;

    if (step2 && input[index] >= 3 ) {
      input[index]--;
      index += input[index] + 1;
    }
    else {
      input[index]++;
      index += input[index] - 1;      
    }
  }
  return steps;
}

console.log('Step 1: ', checkSteps(input.map(x=>x)));
console.log('Step 2: ', checkSteps(input.map(x=>x),true));