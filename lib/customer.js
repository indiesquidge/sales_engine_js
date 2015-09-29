function Customer(data) {
  this.id = data.id;
  this.first_name = data.first_name;
  this.last_name = data.last_name;
  this.created_at = data.created_at;
  this.updated_at = data.updated_at;
}

module.exports = Customer;
