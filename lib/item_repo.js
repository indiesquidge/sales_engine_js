var Parser = require('./parser.js');
var Item = require('./item.js');

function ItemRepository(file) {
  this.createItems(file);
}

ItemRepository.prototype.createItems = function (file) {
  var itemList = new Parser().parse(file);

  this.all = itemList.map(function (item) {
    return new Item(item);
  });
};

module.exports = ItemRepository;
