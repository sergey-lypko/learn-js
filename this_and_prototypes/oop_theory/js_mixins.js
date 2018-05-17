
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
    console.log('Turning on my engine');
  },

  drive: function() {
    this.ignition();
    console.log('Vehicle: driving right now');
  }
}

var Car = explicitMixin(Vehicle, {
  wheels: 4,

  drive: function() {

    // необходимо выполнить drive -> ignition() именно для Car
    // по этому используется explicit binding, чтобы
    // убедиться, что drive будет использовать контекст Car

    // explicit pseudopolymorphism
    Vehicle.drive.call(this);

    console.log('Car: driving right now');
  }
});

Car.drive()
