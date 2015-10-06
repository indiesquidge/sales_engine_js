function Customer(data, parent) {
  this.id = parseInt(data.id, 10);
  this.firstName = data.first_name;
  this.lastName = data.last_name;
  this.createdAt = data.created_at;
  this.updatedAt = data.updated_at;
  this.parent = parent;
}

module.exports = Customer;
