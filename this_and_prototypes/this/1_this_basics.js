// Одна из основных идей с this заключается в том, чтобы иметь
// возможность переиспользовать функции с разными объектами, вместо
// того, чтобы создавать отдельную версию для каждого

// При работе с объектами и прототипами, становится ясна вся польза
// от набора функций, которые автоматически ссылаются на правильный
// объект

// this по сути никак не связывается с тем местом, где функция сздавалась
// но полностью полагается на то, где на вызывается и при каких обстоятельствах

// Во время вызова функции создается контекст выполнения,
// котрый содержит такую информацию как: откуда функция вызывалась (call-site),
// как функция была выполнена, какие параметры принимала и тд. Контекст выполнения
// также будет содержать ссылку this, которая будет испльзваться напртяжении
// всего времени выполнения функции.

// TIP: this - это объект перед точкой (Кантор)

// this is NOT:
// 1) NOT function itself

// 2) NOT function Scope
function hey() {
  console.log(this.name)
}

function hou() {
  // this не передается через scope
  hey()
}

var name = 'hey global'

var obj33 = {
  name: 'obj233',
  speak: hou
}

obj33.speak() // 'hey global'



/* * * * */
function showName() {
  return this.name.toUpperCase()
}

function speak() {
  // showName's this == speak.this
  return 'Hello i am ' + showName.call(this)
}

var me = {
  name: 'Kile'
}

// speak's this == me
speak.call(me) // Hello i am Kile



/* * * * */

function foo1(num) {
  this.count++
}

foo1.count = 0

for (var i = 2; i < 7; i++) {
  // уже при первом вызове функции, создается глобальная переменная
  // count, которая равна undefined
  // затем она просто инкрементируется на саму себя (undefined + undefined === NaN)
  foo1(i)
}

console.log('Count', foo1.count); // NaN


function foo2() {
  this.count++
}

foo2.count = 0

for (var i = 2; i < 7; i++) {
  // при каждом вызове функции ее this будет равен
  // ее обьекту, в том числе foo2.count property/
  // которое в этот раз уже будет инкрементироваться
  foo2.call(foo2)
}

console.log(foo2.count) // 5
