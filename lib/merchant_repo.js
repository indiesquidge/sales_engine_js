var Parser = require('./parser.js');
var Merchant = require('./merchant.js');

function MerchantRepository(file) {
  this.createMerchants(file);
}

MerchantRepository.prototype.createMerchants = function (file) {
  var merchantList = new Parser().parse(file);

  this.merchants = merchantList.map(function (merchant) {
    return new Merchant(merchant);
  });
};

module.exports = MerchantRepository;
