var MerchantRepository = require('./merchant_repo.js');
var InvoiceRepository = require('./invoice_repo.js');
var ItemRepository = require('./item_repo.js');

function SalesEngine() {}

SalesEngine.prototype.startup = function () {
  this.merchantRepository();
  this.invoiceRepository();
  this.itemRepository();
};

SalesEngine.prototype.merchantRepository = function () {
  return new MerchantRepository('./data/merchants.csv').merchants;
};

SalesEngine.prototype.invoiceRepository = function () {
  return new InvoiceRepository('./data/invoices.csv').invoices;
};

SalesEngine.prototype.itemRepository = function () {
  return new ItemRepository('./data/items.csv').items;
};

module.exports = SalesEngine;

var engine = new SalesEngine();
engine.startup();
console.log(engine.itemRepository());
