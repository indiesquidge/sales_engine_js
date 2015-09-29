var Parser = require('./parser.js');
var Transaction = require('./transaction.js');

function TransactionRepository(file) {
  this.createTransactions(file);
}

TransactionRepository.prototype.createTransactions = function (file) {
  var transactionList = new Parser().parse(file);

  this.transactions = transactionList.map(function (transaction) {
    return new Transaction(transaction);
  });
};

module.exports = TransactionRepository;
