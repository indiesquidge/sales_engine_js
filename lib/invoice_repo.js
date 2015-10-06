var Parser = require('./parser.js');
var Invoice = require('./invoice.js');

function InvoiceRepository(file, parent) {
  this.parent = parent;
  this.createInvoices(file);
}

InvoiceRepository.prototype.createInvoices = function (file) {
  var invoiceList = new Parser().parse(file);
  var that = this;

  this.all = invoiceList.map(function (invoice) {
    return new Invoice(invoice, that);
  });
};

InvoiceRepository.prototype.random = function () {
  var allInvoices = this.all;
  return allInvoices[Math.floor(Math.random() * allInvoices.length)];
};

InvoiceRepository.prototype.find = function (id) {
  return this.all.filter(function (invoice) {
    return invoice.id === id;
  })[0];
};

InvoiceRepository.prototype.findByCustomerId = function (id) {
  return this.findAllByCustomerId(id)[0];
};

InvoiceRepository.prototype.findAllByCustomerId = function (id) {
  return this.all.filter(function (invoice) {
    return invoice.customerId === id;
  });
};

InvoiceRepository.prototype.findByMerchantId = function (id) {
  return this.findAllByMerchantId(id)[0];
};

InvoiceRepository.prototype.findAllByMerchantId = function (id) {
  return this.all.filter(function (invoice) {
    return invoice.id === id;
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

InvoiceRepository.prototype.findAllTransactionsByInvoiceId = function (id) {
  return this.parent.findAllTransactionsByInvoiceId(id);
};

InvoiceRepository.prototype.findAllInvoiceItemsByInvoiceId = function (id) {
  return this.parent.findAllInvoiceItemsByInvoiceId(id);
};

InvoiceRepository.prototype.findAllItemsByInvoiceId = function (id) {
  return this.parent.findAllItemsByInvoiceId(id);
};

InvoiceRepository.prototype.findCustomer = function (id) {
  return this.parent.findCustomer(id);
};

InvoiceRepository.prototype.findMerchant = function (id) {
  return this.parent.findMerchant(id);
};

module.exports = InvoiceRepository;
