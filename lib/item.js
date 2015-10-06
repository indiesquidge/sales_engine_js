var BigDecimal = require('big.js');

function Item(data, parent) {
  this.id = parseInt(data.id, 10);
  this.name = data.name;
  this.description = data.description;
  this.unitPrice = new BigDecimal((data.unit_price / 100).toString());
  this.merchantId = parseInt(data.merchant_id);
  this.createdAt = data.created_at;
  this.updatedAt = data.updated_at;
  this.parent = parent;
}

module.exports = Item;
