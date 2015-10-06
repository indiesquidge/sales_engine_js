var chai = require('chai');
var expect = chai.expect;

var SalesEngine = require('../lib/sales_engine.js');
var engine = new SalesEngine();

describe('SalesEngine Transactions', function () {
  describe('Searching', function () {
    describe('.random', function () {
      it('usually returns different things on subsequent calls', function () {
        var transactionRepo = engine.transactionRepository();
        var transactionOne = transactionRepo.random();
        var transactionTwo = transactionRepo.random();

        for (var i = 0; i < 10; i++) {
          if (transactionOne.id !== transactionTwo.id) {
            break;
          }
          transactionTwo = transactionRepo.random();
        }

        expect(transactionOne.id).to.not.equal(transactionTwo.id);
      });
    });

    describe('.findByCreditCardNumber', function () {
      it('can find a record', function () {
        var transaction = engine.transactionRepository().findByCreditCardNumber('4634664005836219');

        expect(transaction.id).to.equal(5536);
      });
    });

    describe('.findAllByResult', function () {
      it('can find multiple records', function () {
        var transactions = engine.transactionRepository().findAllByResult('success');

        expect(transactions.length).to.be.within(4646, 4650);
      });
    });
  });

  describe('Relationships', function () {
    var transaction = engine.transactionRepository().find(1138);

    describe('#invoice', function () {
      it('exists', function () {
        var invoiceCustomer = engine.customerRepository().find(192);

        expect(transaction.invoice().customer().firstName).to.equal(invoiceCustomer.firstName);
      });
    });
  });
});
