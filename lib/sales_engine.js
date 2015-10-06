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
  return new ItemRepository(this.filepath + '/items.csv', this);
};

SalesEngine.prototype.invoiceItemRepository = function () {
  return new InvoiceItemRepository(this.filepath + '/invoice_items.csv', this);
};

SalesEngine.prototype.customerRepository = function () {
  return new CustomerRepository(this.filepath + '/customers.csv', this);
};

SalesEngine.prototype.transactionRepository = function () {
  return new TransactionRepository(this.filepath + '/transactions.csv', this);
};

SalesEngine.prototype.findAllItemsByMerchantId = function (id) {
  return this.itemRepository().findAllByMerchantId(id);
};

SalesEngine.prototype.findAllInvoicesByMerchantId = function (id) {
  return this.invoiceRepository().findAllByMerchantId(id);
};

SalesEngine.prototype.findAllTransactionsByInvoiceId = function (id) {
  return this.transactionRepository().findAllByInvoiceId(id);
};

SalesEngine.prototype.findAllInvoiceItemsByInvoiceId = function (id) {
  return this.invoiceItemRepository().findAllByInvoiceId(id);
};

SalesEngine.prototype.findAllItemsByInvoiceId = function (id) {
  return this.itemRepository().findAllByInvoiceId(id);
};

SalesEngine.prototype.findAllInvoicesbyCustomerId = function (id) {
  return this.invoiceRepository().findAllByCustomerId(id);
};

SalesEngine.prototype.findAllInvoiceItemsByItemId = function (id) {
  return this.invoiceItemRepository().findAllByItemId(id);
};

SalesEngine.prototype.findItem = function (id) {
  return this.itemRepository().find(id);
};

SalesEngine.prototype.findInvoice = function (id) {
  return this.invoiceRepository().find(id);
};

SalesEngine.prototype.findCustomer = function (id) {
  return this.customerRepository().find(id);
};

SalesEngine.prototype.findMerchant = function (id) {
  return this.merchantRepository().find(id);
};

module.exports = SalesEngine;
