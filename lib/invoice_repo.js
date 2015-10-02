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

InvoiceRepository.prototype.find = function (id) {
  return this.all.filter(function (invoice) {
    return invoice.id === id.toString();
  })[0];
};

InvoiceRepository.prototype.findByCustomerId = function (id) {
  return this.findAllByCustomerId(id)[0];
};

InvoiceRepository.prototype.findAllByCustomerId = function (id) {
  return this.all.filter(function (invoice) {
    return invoice.id.toLowerCase() === id.toLowerCase();
  });
};

InvoiceRepository.prototype.findByMerchantId = function (id) {
  return this.findAllByMerchantId(id)[0];
};

InvoiceRepository.prototype.findAllByMerchantId = function (id) {
  return this.all.filter(function (invoice) {
    return invoice.id.toLowerCase() === id.toLowerCase();
  });
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
