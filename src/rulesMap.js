var Rule = require('./rule');

var RulesMap = function () {

	var ruleRegexInputObj = /^([a-zA-Z]+)\([a-zA-Z]+[a-zA-Z,\ ]*\) :- /;
	var ruleNameRegexObj = /^([a-zA-Z]+)(\([a-zA-Z]+[a-zA-Z,\ ]*\))$/;
	var factRegexInputObj = /([a-zA-Z]+)\([a-zA-Z]+[a-zA-Z,\ ]*\)/g;

	this.setFactsMap = function(factsMap){
		this.factsMap = factsMap;
	}

	this.rules = {};

	this.isRuleInput = function(str){
		return ruleRegexInputObj.test(str);
	}

	this.isRuleQuery = function(str){
		return ruleNameRegexObj.test(str);
	}
	
	this.addRule = function(str){
		var index = str.indexOf(" :- ");
		var ruleStart = str.slice(0, index); // dejo la primer parte de la rule
				
		var ruleNameMatch = ruleStart.match(ruleNameRegexObj);
		var ruleName = ruleNameMatch[1];
		var ruleArgs = ruleNameMatch[2];

		var ruleEnd = str.slice(index);
		var factsMatches = ruleEnd.match(factRegexInputObj);
		var rule = new Rule(ruleName,ruleArgs);

		for (var item of factsMatches){
			var match = item.match(ruleNameRegexObj);
			var factName = match[1];
			var factArgs = match[2];	
			rule.addFact(factName,factArgs);		
		}

		this.rules[ruleName] = rule;
	}

    this.parseDB = function (db) {
    	for (var item of db) {
    		if (this.isRuleInput(item)){
  				this.addRule(item);
  			}
  		}
    }

    this.checkRule = function(str){
    	if (!this.isRuleQuery(str)){
    		return false;
    	}
    	var matches = str.match(ruleNameRegexObj);
    	var ruleName = matches[1];
		var args = matches[2];
		if (!this.rules.hasOwnProperty(ruleName)){
			return false;	
		}
		var rule = this.rules[ruleName];
		var queries = rule.getFactsQueries(args);
		for (var query of queries){
			if (!this.factsMap.checkFact(query)){
				return false;
			}	
		}
		return true;
    }

}

module.exports = RulesMap;