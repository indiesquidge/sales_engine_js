function InvoiceItem(data) {
  this.id = data.id;
  this.item_id = data.item_id;
  this.invoice_id = data.invoice_id;
  this.quantity = data.quantity;
  this.unit_price = data.unit_price;
  this.created_at = data.created_at;
  this.updated_at = data.updated_at;
}

module.exports = InvoiceItem;
