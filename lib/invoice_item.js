function InvoiceItem(data) {
  this.id = data.id;
  this.itemId = data.item_id;
  this.invoiceId = data.invoice_id;
  this.quantity = data.quantity;
  this.unitPrice = data.unit_price;
  this.createdAt = data.created_at;
  this.updatedAt = data.updated_at;
}

module.exports = InvoiceItem;
