var chai = require('chai');
var expect = chai.expect;

var SalesEngine = require('../lib/sales_engine.js');
var engine = new SalesEngine();

describe('SalesEngine Invoices', function () {
  describe('Searching', function () {
    describe('.random', function () {
      it('usually returns different things on subsequent calls', function () {
        var invoiceRepo = engine.invoiceRepository();
        var invoiceOne = invoiceRepo.random();
        var invoiceTwo = invoiceRepo.random();

        for (var i = 0; i < 10; i++) {
          if (invoiceOne.id !== invoiceTwo.id) {
            break;
          }
          invoiceTwo = invoiceRepo.random();
        }

        expect(invoiceOne.id).to.not.equal(invoiceTwo.id);
      });
    });

    describe('.findByStatus', function () {
      it('can find a record', function () {
        var invoice = engine.invoiceRepository().findByStatus('cool');

        expect(invoice).to.be.an('undefined');
      });
    });

    describe('.findAllByStatus', function () {
      var invoices = engine.invoiceRepository().findAllByStatus('shipped');

      expect(invoices.length).to.equal(4843);
    });
  });
});
