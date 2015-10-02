var Parser = require('./parser.js');
var Invoice = require('./invoice.js');

function InvoiceRepository(file) {
  this.createInvoices(file);
}

InvoiceRepository.prototype.createInvoices = function (file) {
  var invoiceList = new Parser().parse(file);

  this.all = invoiceList.map(function (invoice) {
    return new Invoice(invoice);
  });
};

InvoiceRepository.prototype.random = function () {
  var allInvoices = this.all;
  return allInvoices[Math.floor(Math.random() * allInvoices.length)];
};

InvoiceRepository.prototype.findByStatus = function (status) {
  return this.findAllByStatus(status)[0];
};

InvoiceRepository.prototype.findAllByStatus = function (status) {
  return this.all.filter(function (invoice) {
    return invoice.status.toLowerCase() === status.toLowerCase();
  });
};

module.exports = InvoiceRepository;
