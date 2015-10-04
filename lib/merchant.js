function Merchant(data, parent) {
  this.id = parseInt(data.id, 10);
  this.name = data.name;
  this.createdAt = data.created_at;
  this.updatedAt = data.updated_at;
  this.parent = parent;
}

Merchant.prototype.findAllItemsByMerchantId = function (id) {
  return this.parent.findAllItemsByMerchantId(id);
};

Merchant.prototype.items = function () {
  return this.findAllItemsByMerchantId(this.id);
};

module.exports = Merchant;
