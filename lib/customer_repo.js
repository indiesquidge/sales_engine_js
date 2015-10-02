var Parser = require('./parser.js');
var Customer = require('./customer.js');

function CustomerRepository(file) {
  this.createCustomers(file);
}

CustomerRepository.prototype.createCustomers = function (file) {
  var customerList = new Parser().parse(file);

  this.all = customerList.map(function (customer) {
    return new Customer(customer);
  });
};

CustomerRepository.prototype.random = function () {
  var allCustomers = this.all;
  return allCustomers[Math.floor(Math.random() * allCustomers.length)];
};

CustomerRepository.prototype.find = function (id) {
  return this.all.filter(function (customer) {
    return customer.id === id;
  })[0];
};

CustomerRepository.prototype.findByFirstName = function (firstName) {
  return this.findAllByFirstName(firstName)[0];
};

CustomerRepository.prototype.findAllByFirstName = function (firstName) {
  return this.all.filter(function (customer) {
    return customer.firstName.toLowerCase() === firstName.toLowerCase();
  });
};

CustomerRepository.prototype.findByLastName = function (lastName) {
  return this.findAllByLastName(lastName)[0];
};

CustomerRepository.prototype.findAllByLastName = function (lastName) {
  return this.all.filter(function (customer) {
    return customer.lastName.toLowerCase() === lastName.toLowerCase();
  });
};

module.exports = CustomerRepository;
