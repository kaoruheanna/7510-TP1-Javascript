var Rule = function(ruleName, ruleArgs){

	this.parseArgsString = function(argsStr){
		argsStr = argsStr.replace('(','');
		argsStr = argsStr.replace(')','');
		var splitted = argsStr.split(',');
		var args = [];
		for (var item of splitted){
			args.push(item.trim());
		}
		return args;
	}

	this.ruleName = ruleName;
	this.ruleArgs = this.parseArgsString(ruleArgs);
	this.facts = [];
	

	this.addFact = function(name, args){
		this.facts.push({
			name: name,
			args: this.parseArgsString(args)
		});
	}

	this.formFactQuery = function(fact, argsReplacement){
		var query = fact.name;
		query += '(';
		var replacedArgs = [];
		for (var i=0; i < fact.args.length; i++){
			var oldArg = fact.args[i];
			var newArg = argsReplacement[oldArg];
			replacedArgs.push(newArg);
		}
		query += replacedArgs.join(', ');
		query += ')';
		return query;
	}

	this.getFactsQueries = function(queryArgs){
		var queryArgsArray = this.parseArgsString(queryArgs);
		var queries = [];
		if (queryArgsArray.length != this.ruleArgs.length){
			return queries;
		}
		
		var argsReplacement = {};
		for (var i = 0; i < queryArgsArray.length; i++){
			var oldArg = this.ruleArgs[i];
			var newArg = queryArgsArray[i];
			argsReplacement[oldArg] = newArg;
		}
		
		for (var fact of this.facts){
			queries.push(this.formFactQuery(fact,argsReplacement));
		}
		return queries;
	}
}

module.exports = Rule;