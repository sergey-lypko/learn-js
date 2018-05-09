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
// все свойства на всех вложенных уровнях всех объектов
// и их цепочек прототиво
// TODO:
// данный механизм можно реализовать с помощью
// рекурсивного обхода полей объекта с дальнейшим
// получением списка полей с помощью Object.keys
