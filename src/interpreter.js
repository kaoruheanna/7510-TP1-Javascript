var FactsMap = require('./factsMap');
var RulesMap = require('./rulesMap');

var Interpreter = function () {

    this.parseDB = function (db) {
    	this.factsMap = new FactsMap();
    	this.factsMap.parseDB(db);
    	this.rulesMap = new RulesMap();
    	this.rulesMap.parseDB(db);
    	this.rulesMap.setFactsMap(this.factsMap);
    }

    this.checkQuery = function (str) {
        return (this.factsMap.checkFact(str) || this.rulesMap.checkRule(str));
    }

}

module.exports = Interpreter;
