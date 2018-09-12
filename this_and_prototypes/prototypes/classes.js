// Важно помнить, что классы - это все та же прототипаная модель только
// с чуть более приятным синтаксисом
class C {
  constructor() {
    C.prototype.counter++;
  }
}

C.prototype.counter = 0;

const c1 = new C();
const c2 = new C();

// И проблемы возникают те же (например в данном случае - перекрытие):
console.log(c2.counter); // 2
console.log(c1.counter === c2.counter); // true
