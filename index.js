// Дополнительные способы проверки и
// получения значений полей объекта
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
