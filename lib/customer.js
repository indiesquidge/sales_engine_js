function Customer(data) {
  this.id = data.id;
  this.firstName = data.first_name;
  this.lastName = data.last_name;
  this.createdAt = data.created_at;
  this.updatedAt = data.updated_at;
}

module.exports = Customer;
