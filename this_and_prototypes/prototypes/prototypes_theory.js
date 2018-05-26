// [[Prototype]] - это просто ссылка на другой объект

// в JavaScript нет такого понятие как класс (как в традиционных ОО-языках)
// есть только объекты

// каждая функция имеет неперечисляемое свойство prototype, 
// которое ссылается на некий объект

// этот объект обычно зовется прототип Foo, потому что мы получаем доступ к нему
// через свойство, которое называется Foo.prototype (не совсем удачно)*  
// и которое является ссылкой на этот объект

// пусть этот объект (для меньшей путаницы) назовем Foo dot prototype
// в итоге каждый объект, созданный с помощью new Foo()
// в конечном итоге некоторым образом будет связан с этим объектом Foo dot prototype

function Foo() {}

// во время создания объекта через конструктор, одно из действий - 
// установка в myNewObject внутреней ссылки [[Prototype]] на объект, 
// на который указывает Foo.prototype
var myNewObject = new Foo();

// в данном контексте Foo.prototype - это объект, о котором идет речь выше - Foo dot prototype
// но ссылка, которая на него указывает, к несчастью выглядит таким же образом*
Object.getPrototypeOf(myNewObject) === Foo.prototype;


// важно снова подчеркнуть принципиальное отличае от традиционной внутренней ОО-механики:
// в класс-ориентированных языках может быть создано множество копий (экземпляров) класса,
// как будто штамповка прессом

// в то же время в JS не происходит действий копирования
// не создается множество экземпляров класса 
// но можно создать множество объектов, которые будут [[Prototype]]-linked
// с общим объектом
function Foo() {}

var firstObject = new Foo();
var secondObject = new Foo();



// Конструкторы
// в языке функции не являются конструкторами
// важно понять, что если функцию называют конструктором, то это не означает
// что объект технически создается с помощью этой функции

// при создании объектов через new любая функция остается просто функцией
// но при вызове этой функции вместе с new происходит инициализация конструктора;
// функция же просто выполняет роль посредника в этом процессе - просто в JS 
// механизм "конструирования" объектов происходит с помощью обычных функций 
// однако только в связке с new


// NothingSpecial - это обыкновенная функция
// но при вызове ее вместе с new происходит вызов конструктора
function NothingSpecial() {
  console.log('Do not mind me');
}
              
// в результате - новый объект,
// который получает [[Prototype]]-ссылку на "Foo dot prototype" своего конструктора
// в данном случае NothingSpecial
var a = new NothingSpecial();
a; // {}



// как говорилось выше, любая функция связана с объектом "Foo dot prototype"
function Foo(name) {
  this.name = name;
}

// этот объект соответственно можно расширять различными свойствами
Foo.prototype.showName = function () {
  
  // помним, что this динамичен
  return this.name;
}

var mark = new Foo('Mark');
var dan = new Foo('Dan');

// объекты mark и dan не содержат в себе свойства (ссылки на функцию) showName
// вместо этого, через алгоритм поиска [[Get]] (см. файл handling_properties.js) они  
// отправляются вверх искать это свойство по цепочке прототипов

// в данном случае тем "общим делегирующим" объектом для mark и dan как раз и будет
// являться наш "Foo dot prototype"
// это как раз то, что и делает new & constructor - устанавливает ссылку между mark, dan и т.д и "Foo dot prototype"

// в итоге оба объекта находят свойство showName в цепочке прототипов и могут использовать его
// вместе со своим контекстом
mark.showName(); // 'Mark'
dan.showName(); // Dan



function Foo() {}

// объект "Foo dot prototype" содержит ссылку на свой конструктор (функцию)
// хотя эта функция (как и любая другая) просто называется конструктором
// (не имеет никакого отношения к ОО-поведению, где конструктор - это специальный метод
// класса, необходимый для инициализации объектов)
Foo.prototype.constructor === Foo; // true

var someNew = new Foo();

// вот это интересный момент:
// на самом деле новосозданный объект someNew не содержит свойство constructor, 
// однако мы помним, что при попытке отыскать свойство у объекта механизм [[Get]]
// идет вверх по цеопчке прототипов
// в данном случае он находит свойство constructor в объекте "Foo dot prototype"
someNew.constructor === Foo; // true


// и, например, если перезаписать наш "Foo dot prototype", то
// становится яснее тот факт, что функция Foo на самом деле не является конструктором 
// Foo просто инициализирует процесс конструирования, триггерит его
function Foo() {}

Foo.prototype = {}

var awesome = new Foo()

// так как "Foo dot prototype" теперь перезаписан и не содержит свойство 
// constructor, происходит дальнейшее движения по цепочке прототипов вплоть до 
// Object.prototype, который будет содержать свойство constructor
awesome.constructor === Foo; // false
awesome.constructor === Object; // true




