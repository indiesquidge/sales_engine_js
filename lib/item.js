var BigDecimal = require('big.js');

function Item(data, parent) {
  this.id = parseInt(data.id, 10);
  this.name = data.name;
  this.description = data.description;
  this.unitPrice = new BigDecimal((data.unit_price / 100).toString());
  this.merchantId = parseInt(data.merchant_id);
  this.createdAt = new Date(data.created_at);
  this.updatedAt = new Date(data.updated_at);
  this.parent = parent;
}

Item.prototype.invoiceItems = function (id) {
  return this.parent.findAllInvoiceItemsByItemId(this.id);
};

Item.prototype.merchant = function (id) {
  return this.parent.findMerchant(this.merchantId);
};

module.exports = Item;
