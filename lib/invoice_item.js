var BigDecimal = require('big.js');

function InvoiceItem(data) {
  this.id = parseInt(data.id, 10);
  this.itemId = parseInt(data.item_id, 10);
  this.invoiceId = parseInt(data.invoice_id, 10);
  this.quantity = parseInt(data.quantity, 10);
  this.unitPrice = new BigDecimal((data.unit_price / 100).toString());
  this.createdAt = data.created_at;
  this.updatedAt = data.updated_at;
}

module.exports = InvoiceItem;
