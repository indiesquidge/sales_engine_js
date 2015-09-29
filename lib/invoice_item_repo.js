var Parser = require('./parser.js');
var InvoiceItem = require('./invoice_item.js');

function InvoiceItemRepository(file) {
  this.createInvoiceItems(file);
}

InvoiceItemRepository.prototype.createInvoiceItems = function (file) {
  var invoiceItemList = new Parser().parse(file);

  this.invoiceItems = invoiceItemList.map(function (invoiceItem) {
    console.log(invoiceItem);
    return new InvoiceItem(invoiceItem);
  });
};

module.exports = InvoiceItemRepository;
