const input = require('./input');
const parser = require('./parser');
const reducer = require('./reducer');


const start = input => {

  const { weights, children, parents, rel } = parser(input);

  const bottomParent = parents
    .filter(parent => children.indexOf(parent) === -1)[0];

  const tree = { name: bottomParent, weight: weights[bottomParent], children: {} };
  const theParents = [tree];

  do {
    let parent = theParents.pop();

    rel[parent.name]
      .map(child => {
        const newParent = { name: child, weight: weights[child], children: {} };
        if (rel[child].length) theParents.push(newParent);
        parent.children[child] = newParent;
      });
  } while (theParents.length);

  console.log('Step 1: ', bottomParent);
  console.log('Step 2: '); reducer(tree);
}

start(input);
