const input = require('./input');

Redis = () => {
  dist = {};

  toKey = arr => arr.map(x=>x).join(' ');
  save = (arr,cycles) => (dist[toKey(arr)] = cycles);
  check = arr => (dist[toKey(arr)]);

  return {save,check}
};

const candidateBank = arr => 
  arr.indexOf(Math.max(...arr));

const redistribute = arr => {
  const copy = arr.map(x => x);
  let index = candidateBank(arr);

  amount = copy[index]
  copy[index++] = 0;

  for (let i = 0 ; i < amount ; i++, index++) {
    copy[index % copy.length]++;
  }

  return copy;
}

const Reallocation = (input,step2) => {
  const redis = Redis();
  let cycles = 0;
  
  do {
    redis.save(input,cycles);
    input = redistribute(input);
    cycles++;
  } while (!redis.check(input));

  return  step2?  cycles - redis.check(input) : cycles;
}

console.log('Step 1: ', Reallocation(input));
console.log('Step 2: ', Reallocation(input,true));

