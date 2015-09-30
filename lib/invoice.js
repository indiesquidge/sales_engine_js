function Invoice(data) {
  this.id = data.id;
  this.customer_id = data.customer_id;
  this.merchant_id = data.merchant_id;
  this.status = data.status;
  this.created_at = data.created_at;
  this.updated_at = data.updated_at;
}

module.exports = Invoice;
