function User(fullName) {
  this.fullName = fullName;

  Object.defineProperty(this, 'firstName', {
    get: function() {
      return this.fullName.split(' ')[0];
    },
    set: function(newFirstName) {
      this.fullName = newFirstName + ' ' + this.lastName;
    }
  });

  Object.defineProperty(this, 'lastName', {
    get: function() {
      return this.fullName.split(' ')[1];
    },
    set: function(newLastName) {
      this.fullName = this.firstName + ' ' + newLastName;
    }
  });
}

var mark = new User("Mark Spenser");

mark.firstName = 'Mark 2';
mark.fullName = 'Devid Jones';
mark.lastName = 'Ooven';
console.log(mark.fullName);
