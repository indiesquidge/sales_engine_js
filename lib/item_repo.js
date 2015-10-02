var Parser = require('./parser.js');
var Item = require('./item.js');
var BigDecimal = require('big.js');
var _ = require('lodash');

function ItemRepository(file) {
  this.createItems(file);
}

ItemRepository.prototype.createItems = function (file) {
  var itemList = new Parser().parse(file);

  this.all = itemList.map(function (item) {
    return new Item(item);
  });
};

ItemRepository.prototype.random = function () {
  var allItems = this.all;
  return allItems[Math.floor(Math.random() * allItems.length)];
};

ItemRepository.prototype.find = function (id) {
  return this.all.filter(function (item) {
    return item.id === id.toString();
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

module.exports = ItemRepository;
