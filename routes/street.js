var express = require('express');
var util = require('util');
var router = express.Router();
var fs = require("fs");

router.get('/:postcode/street/:street',function (req, res, next) {
	var postCode = req.params.postcode;
	var street = req.params.street;
	
	var fileName;
	
	if (street==="Courtney Place" && postCode==='6011') {
		fileName = "street6011.json";
	} else if (street==="Jollys Jewellery" && postCode==='7066') {
		fileName = "street7066.json";
	} else if (street==="Test Street" && postCode==='8088') {
		fileName = "street8088.json";
	} else if (street==="TestStreetName" && postCode==='9011') {
		fileName = "street9011.json";
	}
	
	if (util.isUndefined(fileName)) {
		return next({"message":"404 Err", "status":404});
	}
	
    fs.readFile( __dirname + "/../data/" + fileName, 'utf8', function (err, data) {
        console.log( data );
        var dataObject = JSON.parse(data);
        res.set({'Content-Type':'application/json','Encodeing':'utf8'})
        res.end( JSON.stringify(dataObject,null,2) );
    });
})

module.exports = router;