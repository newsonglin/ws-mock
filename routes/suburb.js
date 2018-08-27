var express = require('express');
var util = require('util');
var router = express.Router();
var fs = require("fs");

router.get('/findSuburb', function (req, res, next) {
	var suburbQueryStr = req.query.suburbQuery;
	
	var jsonFileName;
	if (suburbQueryStr === 'suburb1') {
		jsonFileName = 'findSuburb1.json';
	} else if (suburbQueryStr === 'suburb2') {
		jsonFileName = 'findSuburb2.json';
	} else if (suburbQueryStr === 'FDG') {
		jsonFileName = 'findSuburbFDG.json';
	}
	
	if (util.isUndefined(jsonFileName)) {
		 res.set({'Content-Type':'application/json','Encodeing':'utf8'});
			 
		 var noAddressfound = []; 
		 res.end(JSON.stringify(noAddressfound));
		 
		 return;
	}
	
	
	
    fs.readFile( __dirname + "/../data/" + jsonFileName, 'utf8', function (err, data) {
        console.log( data );
        var dataObject = JSON.parse(data);
        if (util.isUndefined(req.query.suburbQuery)) {
            return next({"message":"Query string is not passed", "status":400});
        }
        //dataObject[0].suburb = dataObject[0].suburb + ' query:' + req.query.suburbQuery;
        res.set({'Content-Type':'application/json','Encodeing':'utf8'})
        res.end( JSON.stringify(dataObject,null,2) );
    });
})

module.exports = router;