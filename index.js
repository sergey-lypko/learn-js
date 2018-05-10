// имеется возможность создавать итераторы любого рода
// и кастомизировать их под свои нужды
var randoms = {
  [Symbol.iterator]: function() {
    return {
      next: function() {
        return {
          value: Math.random()
        }
      }
    }
  }
};

var randomPool = [];

for (var n of randoms) {
  randomPool.push(n);

  if (randomPool.length === 100) {
    break;
  }
}

console.log('randomPool', randomPool);
