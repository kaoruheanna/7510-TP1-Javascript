fs = require('fs');
var Interpreter = require('./interpreter');
var inputFile = process.argv[2];

fs.readFile(inputFile, 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
	var db = data.split("\n");
	var interpreter = new Interpreter();
    var result = interpreter.parseDB(db);
    if (result){
    	return console.log("DB invalida en la linea ",result.err);
    }


    console.log("base de datos correctamente cargada");
	console.log("ingrese sus consultas");
	
	var stdin = process.openStdin();

	stdin.addListener("data", function(d) {
    	var query = d.toString().trim();
    	console.log(interpreter.checkQuery(query));
  	});
       

});