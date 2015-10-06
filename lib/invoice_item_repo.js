var Parser = require('./parser.js');
var InvoiceItem = require('./invoice_item.js');
var BigDecimal = require('big.js');

function InvoiceItemRepository(file, parent) {
  this.parent = parent;
  this.createInvoiceItems(file);
}

InvoiceItemRepository.prototype.createInvoiceItems = function (file) {
  var invoiceItemList = new Parser().parse(file);
  var that = this;

  this.all = invoiceItemList.map(function (invoiceItem) {
    return new InvoiceItem(invoiceItem, that);
  });
};

InvoiceItemRepository.prototype.random = function () {
  var allInvoices = this.all;
  return allInvoices[Math.floor(Math.random() * allInvoices.length)];
};

InvoiceItemRepository.prototype.find = function (id) {
  return this.all.filter(function (invoiceItem) {
    return invoiceItem.id === id;
  })[0];
};

InvoiceItemRepository.prototype.findByItemId = function (id) {
  return this.findAllByItemId(id)[0];
};

InvoiceItemRepository.prototype.findAllByItemId = function (id) {
  return this.all.filter(function (invoiceItem) {
    return invoiceItem.itemId === id;
  });
};

InvoiceItemRepository.prototype.findByInvoiceId = function (id) {
  return this.findAllByInvoiceId(id)[0];
};

InvoiceItemRepository.prototype.findAllByInvoiceId = function (id) {
  return this.all.filter(function (invoiceItem) {
    return invoiceItem.invoiceId === id;
  });
};

InvoiceItemRepository.prototype.findByQuantity = function (quantity) {
  return this.findAllByQuantity(id)[0];
};

InvoiceItemRepository.prototype.findAllByQuantity = function (quantity) {
  return this.all.filter(function (invoiceItem) {
    return invoiceItem.quantity === quantity;
  });
};

InvoiceItemRepository.prototype.findByUnitPrice = function (price) {
  return this.findAllByUnitPrice(price)[0];
};

InvoiceItemRepository.prototype.findAllByUnitPrice = function (price) {
  var bigDecimalPrice = new BigDecimal(price);

  return this.all.filter(function (invoiceItem) {
    return _.isEqual(invoiceItem.unitPrice, bigDecimalPrice);
  });
};

module.exports = InvoiceItemRepository;
