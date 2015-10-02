function Transaction(data) {
  this.id = data.id;
  this.invoiceId = data.invoice_id;
  this.creditCardNumber = data.credit_card_number;
  this.creditCardExpirationDate = data.credit_card_expiration_date;
  this.result = data.result;
  this.createdAt = data.created_at;
  this.updatedAt = data.updated_at;
}

module.exports = Transaction;
