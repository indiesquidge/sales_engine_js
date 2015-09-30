var Parser = require('./parser.js');
var Merchant = require('./merchant.js');

function MerchantRepository(file) {
  this.createMerchants(file);
}

MerchantRepository.prototype.createMerchants = function (file) {
  var merchantList = new Parser().parse(file);

  this.all = merchantList.map(function (merchant) {
    return new Merchant(merchant);
  });
};

MerchantRepository.prototype.random = function () {
  var allMerchants = this.all;
  return allMerchants[Math.floor(Math.random() * allMerchants.length)];
};

module.exports = MerchantRepository;
