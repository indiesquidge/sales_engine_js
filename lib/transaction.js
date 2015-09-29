function Transaction(data) {
  this.id = data.id;
  this.invoice_id = data.invoice_id;
  this.credit_card_number = data.credit_card_number;
  this.credit_card_expiration_date = data.credit_card_expiration_date;
  this.result = data.result;
  this.created_at = data.created_at;
  this.updated_at = data.updated_at;
}

module.exports = Transaction;
