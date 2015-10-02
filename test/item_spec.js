var chai = require('chai'),
    expect = chai.expect;

var BigDecimal = require('big.js');

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
        var item = engine.itemRepository().findByUnitPrice(new BigDecimal('935.19'));

        expect(item.name).to.equal('Item Alias Nihil');
      });
    });

    describe('.findAllByStatus', function () {
      var items = engine.itemRepository().findAllByName('Item Eos Et');

      expect(items.length).to.equal(3);
    });
  });
});