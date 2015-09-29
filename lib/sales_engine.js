var MerchantRepository = require('./merchant_repo.js');
var InvoiceRepository = require('./invoice_repo.js');

function SalesEngine() {}

SalesEngine.prototype.startup = function () {
  this.merchantRepository();
  this.invoiceRepository();
};

SalesEngine.prototype.merchantRepository = function () {
  return new MerchantRepository('./data/merchants.csv').merchants;
};

SalesEngine.prototype.invoiceRepository = function () {
  return new InvoiceRepository('./data/invoices.csv').invoices;
};

module.exports = SalesEngine;

var engine = new SalesEngine();
engine.startup();
console.log(engine.invoiceRepository());
