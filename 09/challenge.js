const input = require('./input');

const compose = (...funcs) => args =>
  funcs.reduce((prev, curr) => curr(prev), args);

const REGEX = {
  ignores: /(!.)/g,
  junk: /<(.*?)>/g
}

const clearIgnores = input => input.replace(REGEX.ignores, '');
const removeJunk = input => input.replace(REGEX.junk, '');
const findJunk = input => input.match(REGEX.junk);
const mapJunk =  junk => junk.map(item => item.length -2);
const countJunk = map => map.reduce((prev,curr) => prev+curr);

const groupScore = input => {
  const stack = [];
  let level = 0;
  let score = 0;
  
  input.split('').forEach(char => {
    switch (char) {
      case '{': stack.push('{'); level++; break;
      case '}': stack.pop(); score += level; level--; break;
      case ',': score = stack.length ? score : 0; break;
    }
  });
  
  return score;
}

const step1 = compose(clearIgnores, removeJunk, groupScore);
const step2 = compose(clearIgnores,findJunk,mapJunk,countJunk);

console.log('Step 1: ', step1(input));
console.log('Step 2: ', step2(input));




