var Parser = require('./parser.js');
var Customer = require('./customer.js');

function CustomerRepository(file) {
  this.createCustomers(file);
}

CustomerRepository.prototype.createCustomers = function (file) {
  var customerList = new Parser().parse(file);

  this.customers = customerList.map(function (customer) {
    return new Customer(customer);
  });
};

module.exports = CustomerRepository;
