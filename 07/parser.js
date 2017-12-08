const parser = input => {
  const array = input.split('\n')
    .map(x => x.split(' -> '))
    .map(prog =>
      prog[1] ?
        [prog[0], prog[1].split(', ')] : [...prog, []]);

  const weights = array
    .map(prog => prog[0].split(' '))
    .reduce((prev, curr) => {
      const weight = parseInt(curr[1].replace(/[()]/g, ''))
      prev[curr[0]] = weight;
      return prev;
    }, {});

  const rel = array
    .map(prog => [prog[0].split(' ')[0], prog[1]])
    .reduce((prev, curr) => {
      prev[curr[0]] = curr[1];
      return prev;
    }, {})

  const parents = array
    .filter(prog => prog[1].length)
    .map(prog => prog[0].split(' ')[0]);

  const children = array
    .filter(prog => prog[1].length)
    .map(prog => prog[1])
    .reduce((prev, curr) => prev.concat(...curr), []);

  return { weights, children, parents, rel };
}

module.exports = parser;