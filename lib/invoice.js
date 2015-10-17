function Invoice(data, parent) {
  this.id = parseInt(data.id, 10);
  this.customerId = parseInt(data.customer_id, 10);
  this.merchantId = parseInt(data.merchant_id, 10);
  this.status = data.status;
  this.createdAt = new Date(data.created_at);
  this.updatedAt = new Date(data.updated_at);
  this.parent = parent;
}

Invoice.prototype.transactions = function () {
  return this.parent.findAllTransactionsByInvoiceId(this.id);
};

Invoice.prototype.invoiceItems = function () {
  return this.parent.findAllInvoiceItemsByInvoiceId(this.id);
};

Invoice.prototype.items = function () {
  return this.invoiceItems(this.id).map(function (invoiceItem) {
    return invoiceItem.item();
  });
};

Invoice.prototype.customer = function () {
  return this.parent.findCustomer(this.customerId);
};

Invoice.prototype.merchant = function () {
  return this.parent.findMerchant(this.merchantId);
};

module.exports = Invoice;
