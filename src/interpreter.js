var FactsMap = require('./factsMap');
var RulesMap = require('./rulesMap');

var Interpreter = function () {

    this.parseDB = function (db) {
    	this.factsMap = new FactsMap();
    	var invalidFacts = this.factsMap.parseDB(db);
    	this.rulesMap = new RulesMap();
    	var invalidRules = this.rulesMap.parseDB(db);
    	for (var item of invalidFacts){
    		if (invalidRules.indexOf(item) != -1){
    			return {
    				err: item
    			}
    		}
    	}
    	this.rulesMap.setFactsMap(this.factsMap);
    }

    this.checkQuery = function (str) {
    	var factCheck = this.factsMap.checkFact(str);
    	var ruleCheck = this.rulesMap.checkRule(str);
    	if (factCheck == 'invalid' && ruleCheck == 'invalid'){
    		throw 'Invalid Query';
    	}
        return (factCheck || ruleCheck);
    }

}

module.exports = Interpreter;
