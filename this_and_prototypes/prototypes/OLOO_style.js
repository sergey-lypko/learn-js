// OLOO - object linked object

// Альтернатива классическому конструкторно-прототипному подходу, которую предлагает Кайл.
// Идея в том, чтобы фокусировать внимание на прототипной связи между объектами, использовать 
// сильные стороны прототипов, но при этом избежать путаницы и возник с конструкторами.
// По итогу получается более простой, читабельный и не менее функциональный код.


// Традиционный подход:

function Person(name){
  this.name = name;
}

Person.prototype.showName = function() {
  return this.name;
}

function Worker(name) {
  Person.call(this, name);
}

// Метод Object.create() создаёт новый объект с указанными объектом прототипа и свойствами.
Worker.prototype = Object.create(Person.prototype);

var bill = new Worker('Bill');
var sam = new Worker('Sam');


// OLOO:

var Person = {
  init: function(name) {
    this.name = name;
  },
  showName: function() {
    return this.name;
  }
};

// Формируем прототипную связь между объектами
var Worker = Object.create(Person);

// Расширять дочерний класс очень просто
Worker.speak = function() {
  return `Some message from: ${this.name}`;
};

// Создание экземпляров с помощью продолжения цепочки прототипов
var mark = Object.create(Worker);
mark.init('Mark');

mark.showName(); // Mark


