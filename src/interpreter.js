var FactsMap = require('./factsMap');

var Interpreter = function () {

    this.parseDB = function (db) {
    	this.factsMap = new FactsMap();
    	this.factsMap.parseDB(db);
    }

    this.checkQuery = function (str) {
        return this.factsMap.checkFact(str);
    }

}

module.exports = Interpreter;
