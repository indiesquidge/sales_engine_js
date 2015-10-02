function Transaction(data) {
  this.id = parseInt(data.id, 10);
  this.invoiceId = parseInt(data.invoice_id, 10);
  this.creditCardNumber = data.credit_card_number;
  this.result = data.result;
  this.createdAt = data.created_at;
  this.updatedAt = data.updated_at;
}

module.exports = Transaction;
