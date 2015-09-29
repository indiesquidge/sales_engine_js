var Parser = require('./parser.js');
var Invoice = require('./invoice.js');

function InvoiceRepository(file) {
  this.createInvoices(file);
}

InvoiceRepository.prototype.createInvoices = function (file) {
  var invoiceList = new Parser().parse(file);

  this.invoices = invoiceList.map(function (invoice) {
    return new Invoice(invoice);
  });
};

module.exports = InvoiceRepository;
