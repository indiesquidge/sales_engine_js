var fs = require('fs');
    Parse = require('babyparse');

function Parser() {}

Parser.prototype.parse = function (file) {
  var csvContents = fs.readFileSync(file, 'utf8');
  var parsed = Parse.parse(csvContents, { header: true });
  var jsonArray = parsed.data;

  return jsonArray;
};

module.exports = Parser;
