const util = require('util');

const reducer = tree => {

  const childWeights = [];
  const answer = [];

  Object.keys(tree.children)
    .map(child => {
      const childWeight = reducer(tree.children[child]);
      childWeights.push(childWeight);
      answer.push({ weight: childWeight, name: child });
      tree.weight += childWeight;
    }
    );
  const diff = Math.max(...childWeights) - Math.min(...childWeights);

  if (diff !== 0 && diff !== -Infinity) {
    console.log(util.inspect(answer, false, null, true))
    process.exit(0);
  }

  return tree.weight;
}

module.exports = reducer;