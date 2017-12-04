const input = require('./input');
const spreadSheet = input
    .split('\n')
    .map(row =>
      row
        .split('\t')
        .map(val => parseInt(val)));

const checksumRow1 = row => Math.max(...row) - Math.min(...row);

const checksumRow2 = row => {
  var returnValue = 0;
  row
    .map((val1, index1, arr) => {
      arr.map((val2, index2) => {
        if (index1 !== index2 && val1 % val2 === 0)
          returnValue = val1 / val2;
      });

    });
  return returnValue;
}

const checksum = (spreadSheet, step) =>
  spreadSheet
    .map(step)
    .reduce((prev, curr) => prev = prev + curr, 0);


console.log('Step one:', checksum(spreadSheet,checksumRow1));
console.log('Step two:', checksum(spreadSheet,checksumRow2));
