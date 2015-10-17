function Merchant(data, parent) {
  this.id = parseInt(data.id, 10);
  this.name = data.name;
  this.createdAt = new Date(data.created_at);
  this.updatedAt = new Date(data.updated_at);
  this.parent = parent;
}

Merchant.prototype.items = function () {
  return this.parent.findAllItemsByMerchantId(this.id);
};

Merchant.prototype.invoices = function () {
  return this.parent.findAllInvoicesByMerchantId(this.id);
};

module.exports = Merchant;
