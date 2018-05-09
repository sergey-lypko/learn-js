// Существует два типа дескрипторов: данных и доступа
var numbers = {
  a: 1
}

Object.defineProperty(numbers, 'b', {
  // value - ДЕСКРИПТР ДАННЫХ
  value: 2,

  writable: true,
  enumerable: true,
  configurable: true
});


// "глубокая заморозка"
// однако это не слишком распространено при работе с JS, так как
// сильно сказывается на потенцеальной гибкости
function makeImmutable(obj) {
  for (var key in obj) {

    // базовый способ сделать свойство объекта константой
    Object.defineProperty(obj, key, {
      configurable: false,
      writable: false
    });

    if (typeof obj[key] === 'object') {
      makeImmutable(obj[key])
    }
  }
}

var car = {
  model: 'Tesla',
  cost: 80000
}

var bike = {
  model: 'Honda',
  cost: 30000,
  closestMashine: car
}

makeImmutable(bike);

bike.closestMashine.cost = 1000;

console.log(bike.closestMashine.cost); // 80000


// Prevent extensions
Object.preventExtensions(someObj); // добавить новые свойства в someObj больше нельзя

// Seal
Object.seal(someObj);
// выполняет то же, что и Object.preventExtensions, но и устанавливает
// флаг cinfigurable: false для каждого свойства - теперь они не могут быть удалены
// или перенастроены

// Freeze
Object.freeze(someObj);
// сначала вызывает для объекта Object.seal, но так же устанавает флаг
// writable: false, таким образом значения становятся неизменяемыми
// !ВАЖНО: рекурсивно выполняется для вложенных оъектов - deep freezing





// [[GET]]
var myOb = {
  a: 1
}

// для получения значения свойства под капотом
// выполняется операция [[GET]]
myOb.a;

// особенности [[GET]] заключаются в основном в том, что происходит, когда
// свойством объекта не найдено (например дальнейшее движение по цепочке прототипов)
myOb.b; // если свойством не обнаружено, по-умолчанию возвращается undefined





// ВАЖНО!
// Чтобы избежать конфликта, запрещено одновременно указывать значение
// value и функции get/set. Либо значение, либо функции для
// его чтения-записи, одно из двух. Также запрещено и не имеет смысла
// указывать writable при наличии get/set-функций.





// Getters and Setters
// дескриптор позволяет задать свойство, которое будет работать
// как функция - это ДЕСКРИПТОР ДОСТУПА

// get — функция, которая будет вызвана при запросе к свойству
// set — функция, которая будет вызвана при записе свойства

// по-сути - get и set дают возможность выполнить какие-то
// дополнительные действия при попытке получения или записи
// свойств бъекта

// таким образом, можно выполнить любой код при присваивании
// и получении свойства, который даже может быть абсолютно
// не связан с изменяемым свойством


var user = {
  name: 'Mark'
}

// showName - обычное свойство user.showName
// но дескриптор указывает, что на самом деле его значение
// возвращается функцией - свойство работает как функция
Object.defineProperty(user, 'showName', {
  get: function() {
    return this.name
  }
});


// get и set дают доступ к более гибкому
// контролю над свойствами объектов

// так же get и set работают с последними
// установленными значениями в полях


function User(fullName) {
  this.fullName = fullName;

  Object.defineProperty(this, 'firstName', {
    get: function() {
      return this.fullName.split(' ')[0];
    },
    set: function(newFirstName) {
      this.fullName = newFirstName + ' ' + this.lastName;
    }
  });

  Object.defineProperty(this, 'lastName', {
    get: function() {
      return this.fullName.split(' ')[1];
    },
    set: function(newLastName) {
      this.fullName = this.firstName + ' ' + newLastName;
    }
  });
}

var mark = new User("Mark Spenser");

mark.firstName = 'Mark 2';
mark.fullName = 'Devid Jones';
mark.lastName = 'Ooven';
console.log(mark.fullName); // Devid Ooven





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
