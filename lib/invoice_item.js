var BigDecimal = require('big.js');

function InvoiceItem(data, parent) {
  this.id = parseInt(data.id, 10);
  this.itemId = parseInt(data.item_id, 10);
  this.invoiceId = parseInt(data.invoice_id, 10);
  this.quantity = parseInt(data.quantity, 10);
  this.unitPrice = new BigDecimal((data.unit_price / 100).toString());
  this.createdAt = new Date(data.created_at);
  this.updatedAt = new Date(data.updated_at);
  this.parent = parent;
}

InvoiceItem.prototype.item = function () {
  return this.parent.findItem(this.itemId);
};

InvoiceItem.prototype.invoice = function () {
  return this.parent.findInvoice(this.invoiceId);
};

module.exports = InvoiceItem;
