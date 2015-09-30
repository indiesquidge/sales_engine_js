var chai = require('chai'),
    expect = chai.expect;

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
          if (merchantOne.id === merchantTwo.id) {
            break;
          }
          merchantTwo = merchantRepo.random();
        }

        expect(merchantOne.id).to.not.equal(merchantTwo.id);
      });
    });
  });
});
