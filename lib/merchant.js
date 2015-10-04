function Merchant(data, parent) {
  this.id = parseInt(data.id, 10);
  this.name = data.name;
  this.createdAt = data.created_at;
  this.updatedAt = data.updated_at;
  this.parent = parent;
}

module.exports = Merchant;
