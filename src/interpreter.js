var FactsMap = require('./factsMap');

var Interpreter = function () {

    this.parseDB = function (db) {
    	this.factsMap = new FactsMap();
    	this.factsMap.parseDB(db);
    }

    this.checkQuery = function (params) {
        return true;
    }

}

module.exports = Interpreter;
