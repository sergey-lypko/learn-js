// OLOO - object linked object

// Альтернатива классическому конструкторно-прототипному подходу, которую предлагает Кайл.
// Идея в том, чтобы фокусировать внимание на прототипной связи между объектами, использовать 
// сильные стороны прототипов, но при этом избежать путаницы и возни с конструкторами, а так же 
// переопределениями/расширениями родительских классов - explicit pseudopolymorphism.
// По итогу получается более простой, читабельный и не менее функциональный код.



// * * * 
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

// Формируем прототипную связь между объектами:
var Worker = Object.create(Person);

// Расширять дочерний класс очень просто:
Worker.speak = function() {
  return `Some message from: ${this.name}`;
};

// Создание экземпляров с помощью продолжения цепочки прототипов:
var mark = Object.create(Worker);
mark.init('Mark');

mark.showName(); // Mark



// * * *
// Сравнение возможных вариантов построения наследования (и связей между объектами)
// стр. 126


// Прототипы:

function Vehicle(engineType, horsePower) {
  this.engineType = engineType;
  this.horsePower = horsePower;
  
  this.engineIsWorking = false; 
}

Vehicle.prototype.engineTurnOn = function() {
  this.engineIsWorking = true;
}

function Car(engineType, horsePower, model) {
  Vehicle.call(this, engineType, horsePower);
  this.model = model;
}

Car.prototype = Object.create(Vehicle.prototype);

// explicit pseudopolymorphism (ugliness) для расширения поведения родительского класса.
Car.prototype.engineTurnOn = function() {
  Vehicle.prototype.engineTurnOn.call(this);
  console.log('Engine now working for Car', this.engineIsWorking);
}

var model3 = new Car('electro', 435, 'Model 3');
model3.engineTurnOn(); // "Engine now working for Car", true


// ES6 Классы:

class Vehicle {
  constructor(engineType, horsePower) {
    this.engineType = engineType;
    this.horsePower = horsePower;

    this.engineIsWorking = false;
  }

  engineTurnOn() {
    this.engineIsWorking = true;
  }
}

class Car extends Vehicle {
  constructor(engineType, horsePower, model) {
    super(engineType, horsePower);

    this.model = model;
  }

  engineTurnOn() {
    Vehicle.prototype.engineTurnOn.call(this);
    console.log(this.engineIsWorking);
  }
}

const modelS = new Car('electro', 'Model S', 362);
modelS.engineTurnOn();


// OLOO (стр. 130)
// Идея так же в том, чтобы отойти от традииционного ОО-подхода "родитель-наследник".
// Vehicle - это своего рода набор базовых утилит, которые затем будут делегированы другим оббектам.
// Так же принцип подразумевает отказ от использования полиморфизма методов и вместо этого 
// указывать более конкретные имена для конкретного действия.

const Vehicle = {
  init(engineType, horsePower) {
    this.engineType = engineType;
    this.horsePower = horsePower;

    this.engineIsWorking = false;
  },
  engineTurnOn() {
    this.engineIsWorking = true;
  }
};

// Прототивная связь между объектами:
const Car = Object.create(Vehicle);

Car.setup = function(engineType, horsePower, model) {
  this.init(engineType, horsePower);
  this.model = model;
};

Car.showSpec = function() {
  console.log(this.engineType, this.horsePower, this.model);
  console.log('Engine is working: ', this.engineIsWorking);
};

const modelX = Object.create(Car);
modelX.setup('electro', 772, 'Model S');
modelX.engineTurnOn();
modelX.showSpec(); // electro 772 Model S . Engine is working:  true


// Примеры использования OLOO
let animal = {
  animalType: 'animal',
  
  describe () {
    return `An ${this.animalType}, with ${this.furColor} fur, 
      ${this.legs} legs, and a ${this.tail} tail.`;
  }
};

let mouse = Object.assign(Object.create(animal), {
  animalType: 'mouse',
  furColor: 'brown',
  legs: 4,
  tail: 'long, skinny'
});


// * * *

let animal = {
  animalType: 'animal',
 
  describe () {
    return `An ${this.animalType} with ${this.furColor} fur, 
      ${this.legs} legs, and a ${this.tail} tail.`;
  }
};
 
let mouseFactory = function mouseFactory () {
  return Object.assign(Object.create(animal), {
    animalType: 'mouse',
    furColor: 'brown',
    legs: 4,
    tail: 'long, skinny'
  });
};

let mickey = mouseFactory();
