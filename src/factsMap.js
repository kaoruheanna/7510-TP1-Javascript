var FactsMap = function () {

	var factRegexObj = /^[a-zA-Z]+\([a-zA-Z]+[a-zA-Z,\ ]*\)\.$/;

	/*var ruleRegexObj = new RegExp('^([a-zA-Z]*)\(([a-zA-Z,\ ]*)\) :- (([a-zA-Z]*)\(([a-zA-Z,\ ]*)\), )*([a-zA-Z]*)\(([a-zA-Z,\ ]*)\)');*/
	var ruleRegexObj = new RegExp('^([a-zA-Z]*)\(([a-zA-Z,\ ]*)\) :- ');

	/*"varon(juan).",*/
	/*"hija(X, Y) :- mujer(X), padre(Y, X)."*/

	this.isFactInput = function(str){
		console.log("str: ",str);
		if (factRegexObj.test(str)){
			console.log("cumple fact");
		}
/*		if (ruleRegexObj.test(str)){
			console.log("cumple rule");
		}
*/		return (factRegexObj.test(str) && !ruleRegexObj.test(str));
	}

    this.parseDB = function (db) {
    	for (var item of db) {
  			if (this.isFactInput(item)){
  				/*console.log("FACT: ",item);*/
  			} else {
  				/*console.log("NO ES FACT: ",item);*/
  			}
  			console.log("----------");
		}
    }

}

module.exports = FactsMap;