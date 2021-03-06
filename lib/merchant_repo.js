var Parser = require('./parser.js');
var Merchant = require('./merchant.js');
var _ = require('lodash');

function MerchantRepository(file, parent) {
  this.parent = parent;
  this.createMerchants(file);
}

MerchantRepository.prototype.createMerchants = function (file) {
  var merchantList = new Parser().parse(file);

  this.all = merchantList.map(function (merchant) {
    return new Merchant(merchant, this);
  }.bind(this));
};

MerchantRepository.prototype.random = function () {
  var allMerchants = this.all;
  return allMerchants[Math.floor(Math.random() * allMerchants.length)];
};

MerchantRepository.prototype.find = function (id) {
  return this.all.filter(function (merchant) {
    return merchant.id === id;
  })[0];
};

MerchantRepository.prototype.findByName = function (name) {
  return this.findAllByName(name)[0];
};

MerchantRepository.prototype.findAllByName = function (name) {
  return this.all.filter(function (merchant) {
    return merchant.name.toLowerCase() === name.toLowerCase();
  });
};

MerchantRepository.prototype.findAllItemsByMerchantId = function (id) {
  return this.parent.findAllItemsByMerchantId(id);
};

MerchantRepository.prototype.findAllInvoicesByMerchantId = function (id) {
  return this.parent.findAllInvoicesByMerchantId(id);
};

MerchantRepository.prototype.mostRevenue = function (numberOfMerchants) {
};

module.exports = MerchantRepository;
