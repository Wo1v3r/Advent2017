const input = require('./input');
const toRows = input => input.split('\n');
const toArrays = input => input.map(row => row.split(' '));
const inputArrays = toArrays(toRows(input));

const noDupes = input =>
  input.every(function (val) {
    return !this[val] && (this[val] = val)
  }, {});

const compose = functions => predicate => functions
  .reduce((p, c) => p = p && c(predicate), true);


const countReducer = (input, ...functions) =>
  input
    .reduce((prev, curr) =>
      prev + (compose(functions)(curr) ? 1 : 0), 0);

Array.prototype.flatten = function () {
  return Array.prototype.concat(...this);
}


const normalizeWord = word => word
  .split('')
  .sort()
  .join('');

const areAnagrams = (word1, word2) => normalizeWord(word1) === normalizeWord(word2);

const hasNoAnagrams = input =>
  input.map((word, index1, arr) =>
    arr.map((otherWord, index2) =>
      index1 === index2 || !areAnagrams(word, otherWord)
    )
  )
    .flatten()
    .every(val => val === true)

console.log('Step 1:', countReducer(inputArrays, noDupes));
console.log('Step 2:', countReducer(inputArrays, hasNoAnagrams, noDupes));








