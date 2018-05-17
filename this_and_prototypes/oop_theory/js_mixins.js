// Eksplicit mixin
function explicitMixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    if (!(key in targetObj)) {
      
      // никакого копирования - ссылки на свойства и методы
      // просто передаются между объектами
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
    // JS вообще не предоставляет возможности к использованию relative polymorphism - 
    // язык не способен задавать поведение для полиморфных методов в теоретической цепочке наследования
    // которой в JS тоже нет, по той причине, что нет классов и нет традиционного наследования 
    // как такового вообще 
    // вместо этого все построено на ссылании и заимствовании методов между объектами

    // explicit pseudopolymorphism в JS:
    // так как оба объекта Vehicle и Car имеют метод с одинаковым именем - drive,
    // чтобы различить вызов на тот или иной, необходима абсолютная (не относительная) ссылка 
    // поэтому мы явно указывам имя объекта Vehicle и вызов метода от него
    
    // но если бы указали просто Vehicle.drive(), использовался бы контекст Vehicle
    // в связи с этим явное указание контекста - exsplicit binding
    Vehicle.drive.call(this);
    
    // таким образом метод drive переопределен, но сохраняет ссылку на родительский метод
    // с необходимым поведением - в данном случае это this.ignition();
    // в то же время можно отлично дополнить переопределенный метод любым другим поведением
    console.log('Making some another stuff here');
  }
});

SpeedBot.drive(); // Turning on my engines, 2
