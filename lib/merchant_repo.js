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

MerchantRepository.prototype.findByName = function (name) {
  return this.findAllByName(name)[0];
};

MerchantRepository.prototype.findAllByName = function (name) {
  return this.all.filter(function (merchant) {
    return merchant.name.toLowerCase() === name.toLowerCase();
  });
};

module.exports = MerchantRepository;
