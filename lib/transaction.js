function Transaction(data) {
  this.id = parseInt(data.id, 10);
  this.invoiceId = parseInt(data.invoice_id, 10);
  this.creditCardNumber = parseInt(data.credit_card_number, 10);
  this.result = data.result;
  this.createdAt = data.created_at;
  this.updatedAt = data.updated_at;
}

module.exports = Transaction;
