var MerchantRepository = require('./merchant_repo.js');
var InvoiceRepository = require('./invoice_repo.js');
var ItemRepository = require('./item_repo.js');
var InvoiceItemRepository = require('./invoice_item_repo.js');
var CustomerRepository = require('./customer_repo.js');
var TransactionRepository = require('./transaction_repo.js');

function SalesEngine(filepath) {
  filepath = filepath || './data';
  this.filepath = filepath;
}

SalesEngine.prototype.merchantRepository = function () {
  return new MerchantRepository(this.filepath + '/merchants.csv', this);
};

SalesEngine.prototype.invoiceRepository = function () {
  return new InvoiceRepository(this.filepath + '/invoices.csv', this);
};

SalesEngine.prototype.itemRepository = function () {
  return new ItemRepository(this.filepath + '/items.csv');
};

SalesEngine.prototype.invoiceItemRepository = function () {
  return new InvoiceItemRepository(this.filepath + '/invoice_items.csv', this);
};

SalesEngine.prototype.customerRepository = function () {
  return new CustomerRepository(this.filepath + '/customers.csv');
};

SalesEngine.prototype.transactionRepository = function () {
  return new TransactionRepository(this.filepath + '/transactions.csv');
};

SalesEngine.prototype.findAllItemsByMerchantId = function (id) {
  return this.itemRepository().findAllItemsByMerchantId(id);
};

SalesEngine.prototype.findAllInvoicesByMerchantId = function (id) {
  return this.invoiceRepository().findAllInvoicesByMerchantId(id);
};

SalesEngine.prototype.findAllTransactionsByInvoiceId = function (id) {
  return this.transactionRepository().findAllTransactionsByInvoiceId(id);
};

module.exports = SalesEngine;
