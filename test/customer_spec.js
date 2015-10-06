var chai = require('chai');
var expect = chai.expect;

var SalesEngine = require('../lib/sales_engine.js');
var engine = new SalesEngine();

describe('SalesEngine Customers', function() {
  describe('Searching', function () {
    describe('.random', function () {
      it('usually returns different things on subsequent calls', function () {
        var customerRepo = engine.customerRepository();
        var customerOne = customerRepo.random();
        var customerTwo = customerRepo.random();

        for (var i = 0; i <= 5; i++) {
          if (customerOne.id !== customerTwo.id) {
            break;
          }
          customerTwo = customerRepo.random();
        }

        expect(customerOne.id).to.not.equal(customerTwo.id);
      });
    });

    describe('.findByLastName', function () {
      it('can find a record', function () {
        var customer = engine.customerRepository().findByLastName('Ullrich');

        expect(['Ramon', 'Brice', 'Annabell']).to.include(customer.firstName);
      });
    });

    describe('.findAllByFirstName', function () {
      it('can find multiple records', function () {
        var customerRepo = engine.customerRepository();
        var customers = customerRepo.findAllByFirstName('Sasha');

        expect(customers.length).to.equal(2);
      });
    });
  });

  describe('Relationships', function () {
    var customer = engine.customerRepository().find(999);

    describe('#invoices', function () {
      it('returns all of a customer\'s invoices', function () {
        expect(customer.invoices().length).to.equal(7);
      });

      it('returns invoices belonging to the customer', function () {
        customer.invoices().forEach(function (invoice) {
          expect(invoice.customerId).to.equal(999);
        });
      });
    });
  });
});
