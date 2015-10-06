function Transaction(data, parent) {
  this.id = parseInt(data.id, 10);
  this.invoiceId = parseInt(data.invoice_id, 10);
  this.creditCardNumber = data.credit_card_number;
  this.result = data.result;
  this.createdAt = data.created_at;
  this.updatedAt = data.updated_at;
  this.parent = parent;
}

Transaction.prototype.invoice = function () {
  return this.parent.findTransactionByInvoiceId(this.invoiceId);
};

module.exports = Transaction;
