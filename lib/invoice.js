function Invoice(data, parent) {
  this.id = parseInt(data.id, 10);
  this.customerId = parseInt(data.customer_id, 10);
  this.merchantId = parseInt(data.merchant_id, 10);
  this.status = data.status;
  this.createdAt = data.created_at;
  this.updatedAt = data.updated_at;
  this.parent = parent;
}

Invoice.prototype.transactions = function () {
  return this.parent.findAllTransactionsByInvoiceId(this.id);
};

module.exports = Invoice;
