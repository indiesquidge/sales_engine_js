function Invoice(data) {
  this.id = data.id;
  this.customerId = data.customer_id;
  this.merchantId = data.merchant_id;
  this.status = data.status;
  this.createdAt = data.created_at;
  this.updatedAt = data.updated_at;
}

module.exports = Invoice;
