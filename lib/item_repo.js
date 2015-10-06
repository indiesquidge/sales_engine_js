var Parser = require('./parser.js');
var Item = require('./item.js');
var BigDecimal = require('big.js');
var _ = require('lodash');

function ItemRepository(file, parent) {
  this.parent = parent;
  this.createItems(file);
}

ItemRepository.prototype.createItems = function (file) {
  var itemList = new Parser().parse(file);
  var that = this;

  this.all = itemList.map(function (item) {
    return new Item(item, that);
  });
};

ItemRepository.prototype.random = function () {
  var allItems = this.all;
  return allItems[Math.floor(Math.random() * allItems.length)];
};

ItemRepository.prototype.find = function (id) {
  return this.all.filter(function (item) {
    return item.id === id;
  })[0];
};

ItemRepository.prototype.findByName = function (name) {
  return this.findAllByName(name)[0];
};

ItemRepository.prototype.findAllByName = function (name) {
  return this.all.filter(function (item) {
    return item.name.toLowerCase() === name.toLowerCase();
  });
};

ItemRepository.prototype.findByFuzzyDescription = function (desc) {
  return this.findAllByFuzzyDescription(desc)[0];
};

ItemRepository.prototype.findAllByFuzzyDescription = function (desc) {
  return this.all.filter(function (item) {
    return ~item.description.toLowerCase().indexOf(desc.toLowerCase());
  });
};

ItemRepository.prototype.findByUnitPrice = function (price) {
  return this.findAllByUnitPrice(price)[0];
};

ItemRepository.prototype.findAllByUnitPrice = function (price) {
  var bigDecimalPrice = new BigDecimal(price);

  return this.all.filter(function (item) {
    return _.isEqual(item.unitPrice, bigDecimalPrice);
  });
};

ItemRepository.prototype.findByMerchantId = function (id) {
  return this.findAllByMerchantId(id)[0];
};

ItemRepository.prototype.findAllByMerchantId = function (id) {
  return this.all.filter(function (item) {
    return item.merchantId === id;
  });
};

ItemRepository.prototype.findAllInvoiceItemsByItemId = function (id) {
  return this.parent.findAllInvoiceItemsByItemId(id);
};

ItemRepository.prototype.findMerchant = function (id) {
  return this.parent.findMerchant(id);
};

module.exports = ItemRepository;
