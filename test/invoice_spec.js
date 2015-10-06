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
      it('can find multiple records', function () {
        var invoices = engine.invoiceRepository().findAllByStatus('shipped');

        expect(invoices.length).to.equal(4843);
      });
    });
  });

  describe('Relationships', function () {
    var invoice = engine.invoiceRepository().find(1002);

    describe('#transactions', function () {
      it('has the correct number of them', function () {
        expect(invoice.transactions().length).to.equal(1);
      });
    });

    describe('#items', function () {
      it('has the correct number of them', function () {
        expect(invoice.items().length).to.equal(3);
      });

      it('has one with a specific name', function () {
        expect(invoice.items().map(function (item) {
          return item.name;
        })).to.include('Item Accusamus Officia');
      });
    });

    describe('#customer', function () {
      it('exists', function () {
        expect(invoice.customer().firstName).to.equal('Eric');
        expect(invoice.customer().lastName).to.equal('Bergnaum');
      });
    });

    describe('#merchant', function () {
      it('exists', function () {
        expect(invoice.merchant().name).to.equal('Rogahn LLC');
      });
    });

    describe('#invoiceItems', function () {
      it('has the correct number of them', function () {
        expect(invoice.invoiceItems().length).to.equal(3);
      });

      it('has one for a specific item', function () {
        var invoiceItemNames = invoice.invoiceItems().map(function (invoiceItem) {
          return invoiceItem.item().name;
        });

        expect(invoiceItemNames).to.include('Item Accusamus Officia');
      });
    });
  });
});
