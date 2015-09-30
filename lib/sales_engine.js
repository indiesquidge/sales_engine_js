var MerchantRepository = require('./merchant_repo.js');
var InvoiceRepository = require('./invoice_repo.js');
var ItemRepository = require('./item_repo.js');
var InvoiceItemRepository = require('./invoice_item_repo.js');
var CustomerRepository = require('./customer_repo.js');
var TransactionRepository = require('./transaction_repo.js');

function SalesEngine() {}

SalesEngine.prototype.merchantRepository = function () {
  return new MerchantRepository('./data/merchants.csv').all;
};

SalesEngine.prototype.invoiceRepository = function () {
  return new InvoiceRepository('./data/invoices.csv').all;
};

SalesEngine.prototype.itemRepository = function () {
  return new ItemRepository('./data/items.csv').all;
};

SalesEngine.prototype.invoiceItemRepository = function () {
  return new InvoiceItemRepository('./data/invoice_items.csv').all;
};

SalesEngine.prototype.customerRepository = function () {
  return new CustomerRepository('./data/customers.csv').all;
};

SalesEngine.prototype.transactionRepository = function () {
  return new TransactionRepository('./data/transactions.csv').all;
};

module.exports = SalesEngine;

var engine = new SalesEngine();
console.log(engine.transactionRepository());
