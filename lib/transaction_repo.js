var Parser = require('./parser.js');
var Transaction = require('./transaction.js');

function TransactionRepository(file) {
  this.createTransactions(file);
}

TransactionRepository.prototype.createTransactions = function (file) {
  var transactionList = new Parser().parse(file);

  this.all = transactionList.map(function (transaction) {
    return new Transaction(transaction);
  });
};

TransactionRepository.prototype.random = function () {
  var allInvoices = this.all;
  return allInvoices[Math.floor(Math.random() * allInvoices.length)];
};

TransactionRepository.prototype.find = function (id) {
  return this.all.filter(function (transaction) {
    return transaction.id === id;
  })[0];
};

TransactionRepository.prototype.findByInvoiceId = function (id) {
  return this.findAllByInvoiceId(id)[0];
};

TransactionRepository.prototype.findAllByInvoiceId = function (id) {
  return this.all.filter(function (transaction) {
    return transaction.invoiceId === id;
  });
};

TransactionRepository.prototype.findByCreditCardNumber = function (number) {
  return this.findAllByCreditCardNumber(number)[0];
};

TransactionRepository.prototype.findAllByCreditCardNumber = function (number) {
  return this.all.filter(function (transaction) {
    return transaction.creditCardNumber === number;
  });
};

TransactionRepository.prototype.findByResult = function (result) {
  return this.findAllByResult(result)[0];
};

TransactionRepository.prototype.findAllByResult = function (result) {
  return this.all.filter(function (transaction) {
    return transaction.result === result;
  });
};

TransactionRepository.prototype.findAllTransactionsByInvoiceId = function (id) {
  return this.all.filter(function (transaction) {
    return transaction.invoiceId === id;
  });
};

module.exports = TransactionRepository;
