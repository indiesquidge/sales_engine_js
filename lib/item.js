function Item(data) {
  this.id = data.id;
  this.name = data.name;
  this.description = data.description;
  this.unit_price = data.unit_price;
  this.created_at = data.created_at;
  this.updated_at = data.updated_at;
}

module.exports = Item;
