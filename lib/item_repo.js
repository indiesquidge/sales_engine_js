var Parser = require('./parser.js');
var Item = require('./item.js');
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

ItemRepository.prototype.findByUnitPrice = function (price) {
  var allItems = this.all;

  for (var i = 0; i < allItems.length; i++) {
    if (_.isEqual(allItems[i].unitPrice, price)) {
      return allItems[i];
    }
  }
};

ItemRepository.prototype.findAllByUnitPrice = function (price) {
  return this.all.filter(function (item) {
    return _.isEqual(item.unitPrice, price);
  });
};

ItemRepository.prototype.findAllByName = function (name) {
  return this.all.filter(function (item) {
    return item.name === name;
  });
};

module.exports = ItemRepository;
