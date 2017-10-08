var FactsMap = function () {

	var factRegexInputObj = /^([a-zA-Z]+)\([a-zA-Z]+[a-zA-Z,\ ]*\)\.$/;
	var factRegexQueryObj = /^([a-zA-Z]+)\([a-zA-Z]+[a-zA-Z,\ ]*\)$/;

	var ruleRegexObj = new RegExp('^([a-zA-Z]*)\(([a-zA-Z,\ ]*)\) :- ');

	this.facts = {};

	this.isFactInput = function(str){
		return factRegexInputObj.test(str);
	}
	this.isFactQuery = function(str){
		return factRegexQueryObj.test(str);
	}

	this.addFact = function(str){
		var matches = str.match(factRegexInputObj);
		var factName = matches[1];
		if (!this.facts.hasOwnProperty(factName)){
			this.facts[factName] = [];
		}
		this.facts[factName].push(str);
	}

    this.parseDB = function (db) {
    	var invalidFacts = [];
    	for (var i = 0; i < db.length; i++) {
    		var item = db[i];
  			if (this.isFactInput(item)){
  				this.addFact(item);
  			} else {
  				invalidFacts.push(i);
  			}
  		}
  		return invalidFacts;
    }

    this.checkFact = function(str){
    	if (!this.isFactQuery(str)){
    		return 'invalid';
    	}
    	var matches = str.match(factRegexQueryObj);
		var factName = matches[1];
		if (!this.facts.hasOwnProperty(factName)){
			return false;	
		}
		var currentFact = this.facts[factName];
		var needle = str+".";
		var index = currentFact.indexOf(needle);
		return (index != -1);
    }

}

module.exports = FactsMap;