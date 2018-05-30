// типичный пример прототипно-ориентированного наследования
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.showBio = function() {
  console.log(this.name, this.age);
}

function Worker(name, age, job) {
  Person.call(this, name, age);
  this.job = job;
}

// Object.create создает новый объект, который получает [[Prototype]]-ссылку
// на объект Worker.prototype *1

// следует помнить, что теперь, когда прототип функции-конструктора Worker перезаписан *2,
// этот перезаписанный прототип теряет ссылку constructor на функцию Worker
Worker.prototype = Object.create(Person.prototype);


Worker.prototype.showJob = function() {
  console.log(this.job);
}

var noname = new Person();
Person.showJob()


// важно отметить, что на первый взгляд кажется, что установить прототипную связь *1
// можно и с помощью инструкции типа Worker.prototype = Person.prototype

// однако на самом деле, после такой запси Worker.prototype теперь была бы очередная
// ссылка на объект Person.prototype
// и при попытке добавить или изменить какое-то поле Worker.prototype
// на самом деле изменения вносились бы в объект Person.prototype
var me = {
  name: 'Me'
}

var you = me;
you.name; // 'Me'  <-- Епт!


// в то же время в ES6 появилась утилита, позволяющая не перезаписывать *2, 
// но модифицировать прототип объекта, связывая его с другим прототипом
Object.setPrototypeOf(Worker.prototype, Person.prototype);



// для определения "происхождения объекта" через конструктор используется метод instanceof
// он от-части может вести к некоторым противоречиям из-за своего ОО-ориентированного 
// названия (связь с классами)
function Foo() { }

// помним, что new устанавливает [[Prototype]] ссылку между новосозданным 
// объектом и прототипом конструктора - Foo.prototype
var newSome = new Foo();

// instanceof проходится по всей цепочке прототипов newSome в попытке 
// отыскать объект связванный с Foo.prototype

// объект слева и функция (предикат конструктора) справа
newSome instanceof Foo; // true

// недостатком такого подхода является необходимость иметь на руках сылку на функцию-конструктор
// с помощью instanceof не удастся проверить прототипную связь между двумя объектами
