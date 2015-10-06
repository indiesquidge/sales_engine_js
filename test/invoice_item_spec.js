var chai = require('chai');
var expect = chai.expect;

var SalesEngine = require('../lib/sales_engine.js');
var engine = new SalesEngine();

describe('SalesEngine Invoice Items', function () {
  describe('Searching', function () {
    describe('.random', function () {
      it('usually returns different things on subsequent calls', function () {
        var invoiceItemRepo = engine.invoiceItemRepository();
        var invoiceItemOne = invoiceItemRepo.random();
        var invoiceItemTwo = invoiceItemRepo.random();

        for (var i = 0; i < 10; i++) {
          if (invoiceItemOne.id !== invoiceItemTwo.id) {
            break;
          }
          invoiceItemTwo = invoiceItemRepo.random();
        }

        expect(invoiceItemOne.id).to.not.equal(invoiceItemTwo.id);
      });
    });

    describe.skip('.findByItemId', function () {
      it('can find a record', function () {
        var invoiceItem = engine.invoiceItemRepository().findByItemId(123);

        expect(invoiceItem.item().name).to.equal('Item Doloribus Ducimus');
      });
    });

    describe('.findAllByQuantity', function () {
      it('can find multiple records', function () {
        var invoiceItems = engine.invoiceItemRepository().findAllByQuantity(10);

        expect(invoiceItems.length).to.equal(2140);
      });
    });
  });

  describe('Relationships', function () {
    var invoiceItem = engine.invoiceItemRepository().find(16934);

    describe('#item', function () {
      it('exists', function () {
        expect(invoiceItem.item().name).to.equal('Item Cupiditate Magni');
      });
    });

    describe('#invoice', function () {
      it('exists', function () {
        expect(invoiceItem.invoice().id).to.equal(3781);
      });
    });
  });
});
