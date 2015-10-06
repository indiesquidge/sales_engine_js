var chai = require('chai');
var expect = chai.expect;

var SalesEngine = require('../lib/sales_engine.js');
var engine = new SalesEngine();

describe('SalesEngine Items', function () {
  describe('Searching', function () {
    describe('.random', function () {
      it('usually returns different things on subsequent calls', function () {
        var itemRepo = engine.itemRepository();
        var itemOne = itemRepo.random();
        var itemTwo = itemRepo.random();

        for (var i = 0; i < 10; i++) {
          if (itemOne.id !== itemTwo.id) {
            break;
          }
          itemTwo = itemRepo.random();
        }

        expect(itemOne.id).to.not.equal(itemTwo.id);
      });
    });

    describe('.findByUnitPrice', function () {
      it('can find a record', function () {
        var item = engine.itemRepository().findByUnitPrice('935.19');

        expect(item.name).to.equal('Item Alias Nihil');
      });
    });

    describe('.findAllByStatus', function () {
      it('can find multiple records', function () {
        var items = engine.itemRepository().findAllByName('Item Eos Et');

        expect(items.length).to.equal(3);
      });
    });

    describe('.findByFuzzyDescription', function () {
      it('can find one based on a fuzzy description query', function () {
        var itemRepo = engine.itemRepository();
        var item = itemRepo.findByFuzzyDescription('Debitis et nobis');

        expect(item.name).to.equal('Item Blanditiis Soluta');
      });
    });

    describe('.findByAllFuzzyDescription', function () {
      it('can find many based on a fuzzy description query', function () {
        var itemRepo = engine.itemRepository();
        var items = itemRepo.findAllByFuzzyDescription('Aut error');

        expect(items.length).to.equal(6);
      });
    });
  });

  describe('Relationships', function () {
    var item = engine.itemRepository().findByName('Item Saepe Ipsum');

    describe('#invioceItems', function () {
      it('has the correct number of them', function () {
        expect(item.invoiceItems().length).to.equal(8);
      });

      it('really owns them all', function () {
        item.invoiceItems().forEach(function (invoiceItem) {
          expect(invoiceItem.itemId).to.equal(item.id);
        });
      });
    });

    describe('#merchant', function () {
      it('exists', function () {
        expect(item.merchant().name).to.equal('Kilback Inc');
      });
    });
  });
});
