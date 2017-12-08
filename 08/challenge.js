
const input = require('./input');

const memory = () => {
  const mem = {};
  let highest = -Infinity;

  save = (r, v) => {
    mem[r] = v
    highest = Math.max(highest, v);
  };

  load = r => mem[r] || 0;

  getHighest = () => highest;

  getMax = () => Math
    .max(...Object.keys(mem)
      .map(x => mem[x]));

  return { save, load, getMax, getHighest };
}

const command = row => ({
  lv: row[0],
  action: row[1],
  rv: parseInt(row[2]),
  lc: row[4],
  cond: row[5],
  rc: parseInt(row[6])
});

const eval = (lc, cond, rc) => {
  switch (cond) {
    case '>': return lc > rc;
    case '<': return lc < rc;
    case '>=': return lc >= rc;
    case '<=': return lc <= rc;
    case '==': return lc === rc;
    case '!=': return lc !== rc;
    default: return false;
  }
}

const calc = (lv, action, rv) => {
  switch (action) {
    case 'dec': return lv - rv;
    case 'inc': return lv + rv;
  }
}

const exec = command => {
  const { lv, rv, lc, rc, cond, action } = command;

  if (eval(mem.load(lc), cond, rc)) {
    const res = calc(mem.load(lv), action, rv);
    mem.save(lv, res);
  }
}

const mem = memory();

input.split('\n')
  .map(x => x.split(' '))
  .map(command)
  .map(exec);


const max = mem.getMax();
const highest = mem.getHighest();

console.log('Step 1: ', max);
console.log('Step 2: ', highest);