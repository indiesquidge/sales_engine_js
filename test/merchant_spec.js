var chai = require('chai');
var expect = chai.expect;

var SalesEngine = require('../lib/sales_engine.js');
var engine = new SalesEngine();

describe('SalesEngine Merchants', function() {
  describe('Searching', function () {
    describe('.random', function () {
      it('usually returns different things on subsequent calls', function () {
        var merchantRepo = engine.merchantRepository();
        var merchantOne = merchantRepo.random();
        var merchantTwo = merchantRepo.random();

        for (var i = 0; i <= 5; i++) {
          if (merchantOne.id !== merchantTwo.id) {
            break;
          }
          merchantTwo = merchantRepo.random();
        }

        expect(merchantOne.id).to.not.equal(merchantTwo.id);
      });
    });

    describe('.find', function () {
      it('can find a record by id', function () {
        var merchant = engine.merchantRepository().find(29);

        expect(merchant.name).to.equal('Tromp Inc');
      });
    });

    describe('.findByName', function () {
      it('can find a record', function () {
        var merchant = engine.merchantRepository().findByName('Marvin Group');

        expect(merchant.name).to.equal('Marvin Group');
      });
    });

    describe('.findAllByName', function () {
      it('can find multiple records', function () {
        var merchantRepo = engine.merchantRepository();
        var merchants = merchantRepo.findAllByName('Williamson Group');

        expect(merchants.length).to.equal(2);
      });
    });
  });

  describe('Relationships', function () {
    var merchant = engine.merchantRepository().findByName('Kirlin, Jakubowski and Smitham');

    describe('#items', function () {
      it('has the correct number of them', function () {
        expect(merchant.items().length).to.equal(33);
      });

      it('includes a known item', function () {
        expect(merchant.items().map(function (item) {
          return item.name;
        })).to.include('Item Consequatur Odit');
      });
    });

    describe('#invoices', function () {
      it('has the correct number of them', function () {
        expect(merchant.invoices().length).to.equal(43);
      });

      it.skip('has a shipped invoice for a specific customer', function () {
        var invoice = merchant.invoices().filter(function (invoice) {
          return invoice.customer.lastName === 'Block';
        });

        expect(invoice.status).to.equal('shipped');
      });
    });
  });
});
