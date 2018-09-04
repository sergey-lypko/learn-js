// Главное - это всегда помнить, что this динамичен.


function Building(totalArea, height) {
  
  // totalArea и height на самом деле никак не ассоциируются с функцией-конструктором Building
  // с чем они на самом деле ассоциируются - это с будущим объектом, который будет создан с 
  // помощью функции-констркутора Building
  // именно на него указывает this
  this.totalArea = totalArea;
  this.height = height;
}

Building.prototype.showBuildingHeight = function() {
  
  // Все так же важно помнить, что Building.prototype не ассоциируется с самой функцией-конструктором Building,
  // но с будущим объектом (см. выше)
  return this.height;
}

Building.prototype.addFloor = function() {
  
  // Обращаясь к this в функциях прототипа обращение происходит к будущему объекту
  this.showBuildingHeight();
}

// this из функций выше - это объект house
const house = new Building(100, 10);
