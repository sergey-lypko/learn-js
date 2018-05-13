// Existence
var ob21 = {
  a: 89
}

// in оператор проверяет наличие свойства в объекте,
// но так же идет вверх по цепочке прототипов объекта
('a' in ob21); // true
('b' in ob21); // false


// in оператор проверяет имена свойств, но не значения -
// конструкция такого рода не будет работать, как предполагается
('4' in [1, 2, 3, 4])
(4 in [1, 2, 3, 4])


// hasOwnProperty в свою очередь ограничивается
// только свойствами самого объекта
ob21.hasOwnProperty('a'); // true

// hasOwnProperty работает прекрасно за исключением тех
// случаев, когда объект создается с помощью операции
// Object.create(null) - в этом случае вызов на этом
// объекте hasOwnProperty приведет к ошибке

// надежным сценарием для выполнения такого рода проверок
// является использование конструкции по типу:
Object.prototype.hasOwnProperty.call(ob21, 'a');
// заимствуется базовый метод hasOwnProperty с явным
// указанием контекста




// Enumeration
var myO = {
  a: 0
};

Object.defineProperty(myO, 'b', {
  value: 1,
  enumerable: false
});

myO.b; // 1
('b' in myO): // true
myO.hasOwnProperty('b'); // true

// таким образом видно, что enumerable: false
// не скрывает свойство и не блокирует доступ к нему
// задача enumerable - возвращать свойство или нет
// при итерации объекта

for (var key in myO) {
  console.log(key); // a
}

// стоит отметить что for in может быть использован и
// с массивами, однако делать это не рекомендуется, так как
// в итерацию могут попасть не только числовые индексы, но
// и все enumerable: true свойства, что приведет к
// непредсказуемому поведению


// Дополнительные способы проверки и
// получения значений полей объеков
var myOb = {};

Object.defineProperty(myOb, 'a', {
  value: 1,
  enumerable: true
});

Object.defineProperty(myOb, 'b', {
  value: 2,
  enumerable: false
});

myOb.propertyIsEnumerable('a'); // true
myOb.propertyIsEnumerable('b'); // false


// Object.keys и Object.getOwnPropertyNames -
// оба идут только по базовым объектам, без
// дальнейшего движения вверх по цепочке прототипов

// Object.keys возвращает все enumerable
// свойства объекта
Object.keys(myOb); // ['a']

// Object.getOwnPropertyNames возвращает все свойства,
// enumerable или нет
Object.getOwnPropertyNames(myOb); // ['a', 'b']


// NOTE:
// на данный момент нет способа проверить/получить
// все свойства (enumerable или нет) на всех вложенных
// уровнях всех объектов и их цепочек прототипов
// TODO:
// данный механизм можно реализовать с помощью
// рекурсивного обхода полей объекта с дальнейшим
// получением списка полей с помощью Object.keys




// Iteration
var ob = {
  a: 1,
  b: 2,
  c: 3
}

// for in перебирает ключи объектов
// так же включая цепочку [[Prototype]]
// NOTE: порядок перебора может сильно отличаться
// в зависимости от используемого движка
for (key in ob) {
  console.log(key);
}


// Итераторы – расширяющая понятие «массив» концепция
// Итераторы (итерируемые объекты) - те, содержимое которых можно перебрать в цикле
// https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e

// для прямой итерации значений (а не индексов или ключей)
// используется for of
// for of устраняет проблемы, которые возникают при работе с обычными циклами
// например ситуации, когда необходимо работать с переменными
// внутри вложенных циклов и тд.
// http://www.javascripttutorial.net/es6/javascript-iterator/

// for of общается с объектом-итератором (@@iterator)
// этот итератор указывает какие значения могут использоваться
// для итерации с помщью вызова метода итератора next()

// у массивов есть свой встроенный @@iterator так что
// for of отлично подходит для итерации по ним
for (var el of [1, 2, 3, 4]) {

}


// мануальный проход по массиву, используя встроенный итератор
// for of выполняет подобные процедуры у себя под капотом
var myArr = [2, 10, 23, 12];

// Symbol - служит для создания уникальных идентификаторов, неизменяем
var myIt = myArr[Symbol.iterator]();

console.log(myIt.next());
console.log(myIt.next());
console.log(myIt.next());


// в то время как у массивов имеется встроенный итератор,
// у обычных объектов - нет
var ob = {
  a: 1,
  b: 2
}

// будет выброшена ошибка ob[Symbol.iterator] is not a function -
// у данного объекта нет итератора
for (var v of ob) {
  console.log(v);
}

// создадим собственный итератор
Object.defineProperty(ob, Symbol.iterator, {
  // объявляя кастомный итератор, мы создаем свойство-утилиту,
  // которые не должно быть видимо при обычно переборе свойств объекта
  enumerable: false,

  writable: false,
  configurable: true,

  value: function() {
    var self = this;
    var index = 0;
    var ks = Object.keys(this);

    return {
      next: function() {
        console.log(index)

        return {
          value: self[ks[index++]],
          done: (index > ks.length)
        };
      }
    };
  }
});

// после того как итератор для объекта объявляен, его можно
// итерировать с помощью for of
for (var v of ob) {
  console.log(v);
}

// соответственно то же самое можно сделать вручную
var myIter = ob[Symbol.iterator]();
myIter.next(); // { value:2, done:false }
myIter.next(); // { value:3, done:false }
myIter.next(); // { value:undefined, done:true }


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
