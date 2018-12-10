var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing spells into DynamoDB. Please wait.");

var allMovies = JSON.parse(fs.readFileSync('5e-SRD-Spells.json', 'utf8'));
errorCount=0;

allMovies.forEach(function(spell) {
    var params = {
        TableName: "Spells",
        Item: {
            "index":  		spell.index,
            "name": 		spell.name,
            "desc":  		spell.desc,
	    "page":		spell.page,
	    "range":		spell.range,
	    "components":	spell.components,
	    "ritual":		spell.ritual,
	    "duration":		spell.duration,
	    "casting_time":	spell.casting_time,
	    "level":		spell.level,
	    "school":		spell.school,
	    "classes":		spell.classes,
	    "url":		spell.url,
	    "subclasses":	spell.subclasses
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add spell", spell.name, ". Error JSON:", JSON.stringify(err, null, 2));
	   console.error(spell);
	   console.log(++errorCount);
       } else {
           //console.log("PutItem succeeded:", spell.name);
       }
    });
})

