
// JS в то же время не подразумевает копирование
// в JS нет классов, есть объекты и эти объекты связываются
// друг с другом для получение данных

// фейковые способ "копирования" описанный выше ^
// Eksplicit mixin
function explicitMixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key];
    }
  }

  return targetObj;
}

var Vehicle = {
  engines: 1,

  ignition: function() {
    console.log('Turning on my engines', this.engines);
  },

  drive: function() {
    this.ignition();
  }
}

var SpeedBot = explicitMixin(Vehicle, {
  engines: 2,

  drive: function() {

    // explicit pseudopolymorphism
    // так как оба объекта Vehicle и Car имеют метод с одинаковым именем - drive,
    // чтобы различить вызов на тот или иной, необходима абсолютная (не относительная) ссылка 
    // поэтому мы явно указывам имя объекта Vehicle и вызов метода от него
    
    // но если бы указали просто Vehicle.drive(), использовался бы контекст Vehicle
    // в связи с этим явное указание контекста - exsplicit binding
    Vehicle.drive.call(this);
    
    // таким образом метод drive переопределен, но сохраняет ссылку на радительский метод
    // с необходимым поведением - в данном случае это this.ignition();
    // в то же время можно отлично дополнить переопределенный метод любым другим поведением
    console.log('Making some another stuff here');
  }
});

SpeedBot.drive(); // Turning on my engines, 2
