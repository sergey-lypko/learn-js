// В порядке возрастания
// 1. Default binding
// 2. Implicit binding
// 3. Explicit binding

// 3-4. (Explicit and new)
// утилита определяет, была ли hard-bound функция
// вызваана с помощью new и если да то используется новый
// this, созданный с помощью new

function foo(something) {
  this.a = something
}

var obj1 = {}

var bar = foo.bind(obj1)
bar(2)

// new did not change obj1.a
var baz = new bar(3)

console.log('obj1.a', obj1.a); // 2
console.log('baz.a', baz.a); // 3




// !IMPORTANT! переопределить контектс после bind не удастся
function foo(something) {
  console.log(this.name)
}

var obj1 = {name: 'obj1'}
var obj2 = {name: 'obj2'}

var obj1Foo = foo.bind(obj1)
obj1Foo.call(obj2) // 'ojb1'
