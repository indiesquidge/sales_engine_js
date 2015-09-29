var MerchantRepository = require('./merchant_repo.js');

function SalesEngine() {}

SalesEngine.prototype.startup = function () {
  this.merchantRepository();
};

SalesEngine.prototype.merchantRepository = function () {
  return new MerchantRepository('./data/merchants.csv').merchants;
};

module.exports = SalesEngine;

var engine = new SalesEngine();
engine.startup();
console.log(engine.merchantRepository());
