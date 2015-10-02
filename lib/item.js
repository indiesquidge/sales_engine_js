var BigDecimal = require('big.js');

function Item(data) {
  this.id = data.id;
  this.name = data.name;
  this.description = data.description;
  this.unitPrice = new BigDecimal((data.unit_price / 100).toString());
  this.createdAt = data.created_at;
  this.updatedAt = data.updated_at;
}

module.exports = Item;
