var MerchantRepository = require('./merchant_repo.js');
var InvoiceRepository = require('./invoice_repo.js');
var ItemRepository = require('./item_repo.js');
var InvoiceItemRepository = require('./invoice_item_repo.js');
var CustomerRepository = require('./customer_repo.js');

function SalesEngine() {}

SalesEngine.prototype.merchantRepository = function () {
  return new MerchantRepository('./data/merchants.csv').merchants;
};

SalesEngine.prototype.invoiceRepository = function () {
  return new InvoiceRepository('./data/invoices.csv').invoices;
};

SalesEngine.prototype.itemRepository = function () {
  return new ItemRepository('./data/items.csv').items;
};

SalesEngine.prototype.invoiceItemRepository = function () {
  return new InvoiceItemRepository('./data/invoice_items.csv').invoiceItems;
};

SalesEngine.prototype.customerRepository = function () {
  return new CustomerRepository('./data/customers.csv').customers;
};

module.exports = SalesEngine;

var engine = new SalesEngine();
console.log(engine.customerRepository());
