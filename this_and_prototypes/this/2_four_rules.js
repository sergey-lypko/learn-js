// 4 правила определения this
// при определении, какое правило применяется в текущий момент,
// следует руководствоваться call-site функции

// уместно приводить аналогии с языковыми конструкциями из реальной жизни:
// "мне не нравится это" - в данном случае "это"
// без контекста грубо говоря можно трактовать как "undefined"



function foo(contxt) {
  this.self = contxt
  console.log(self.name);
}

var mark = {
  name: 'mark',
  sayWrong: function(fn) {
    fn(); // will not work
    foo(); // will not work as well
  },
  say: function() {
    foo(this)
  }
}

mark.sayWrong(foo)
mark.say()



/* * * 1. Default binding * * */
// standalone function invocation
function foo() {
  console.log(this.a)
}

var a = 2

foo(); // 2



/* * * 2. Implicit binding * * */
function foo2() {
  console.log(this.b)
}

var obj = {
  b: 3,
  foo2: foo2
}

// в данном случае this.b - это синоним obj.b
obj.foo2(); // 3


// только последний/высший уровень играет роль
function foo3() {
  console.log(this.c)
}

var obj2 = {
  c: 11,
  foo3: foo3
}

var obj3 = {
  c: 22,
  obj2: obj2
}

obj3.obj2.foo3(); // 11


// Implicitly lost
function foo4() {
  console.log(this.d)
}

var obj4 = {
  d: 5,
  foo4: foo4
}

// фактически то же, что и var reassign = foo4()
// т.е. в переменную просто записывается ссылка на функцию foo4
// БЕЗ связи с контекстом в виде объекта obj4
var reassign = obj4.foo4
reassign(); // undefined

var d = 'global D'
reassign();// 'global D'



/* * * 3. Explicit binding * * */

// Hard binding
function foo() {
  console.log(this.a)
}

var obj = {
  a: 'a'
}

var bar = function() {
  // навсегда связывает obj с foo в этом вызове
  foo.call(obj)
}

var a = 10

bar(); // 'a'
setTimeout(bar, 1000); // 'a'

//
bar.call(this)



// simple bind implementation
function myBind(obj, fn) {
  return function() {
    return fn.apply(obj, arguments);
  }
}

function Person(name, salary) {
  this.employerName = name;
  this.salary = salary;
}

function calculateSalary(...positions) {
  var totalSalary = this.salary + positions.reduce(function (prev, next) {
    return prev + next;
  });

  console.log(this.employerName + ' salary is equal ' + totalSalary);
}

var Tony = new Person('Tony', 21000);
var personShowSalary = myBind(Tony, calculateSalary)

personShowSalary(21, 232, 433)



/* * * 3. new binding * * */

// понятие constructor отличается от традиционных ООП-языкв
// там constructor - это специаальный метод, прикрепленный к классу
// и который вызывается во время создания нового экземпляра

// JS синтаксически похож в этом плане, но по фатку все работает
// кардинально по-другому: constructor в JS - это обычновенная функция,
// которая была вызвана через оператор new. Эта функция никак не связанна
// ни с какими-либо классами

function Car(model) {
  this.model = model;
}

var Mazda = new Car('Mazda');
