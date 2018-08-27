var express = require('express');
var util = require('util');
var router = express.Router();
var fs = require("fs");

router.get('/findAddress', function (req, res, next) {
    fs.readFile( __dirname + "/../data/" + "findAddress.json", 'utf8', function (err, data) {
        console.log( data );
        var dataObject = JSON.parse(data);
        if (util.isUndefined(req.query.addressQuery)) {
            return next({"message":"Query string is not passed", "status":400});
        }
		
		// For testing Address Not Found scenario
		if (req.query.addressQuery == 'testaddressnotfound') {
			 res.set({'Content-Type':'application/json','Encodeing':'utf8'});
			 
			 var noAddressfound = []; 
			 res.end(JSON.stringify(noAddressfound));
			 
			 return;
		}
		
		
        //dataObject[0].description = dataObject[0].description + ' query:' + req.query.addressQuery + ' type:' + req.query.addressType ;
        res.set({'Content-Type':'application/json','Encodeing':'utf8'})
        res.end( JSON.stringify(dataObject,null,2) );
    });
})

router.get('/:addressId',function (req, res, next) {
	var reqAddressId = req.params.addressId;
	
	// Now we just support 3 mock address details, their id is: 0, 1, 2
	if (reqAddressId != '0' && reqAddressId != '1' && reqAddressId != '2') {
		return next({"message":"404 Err", "status":404});
	}
	
	var jsonFileName = __dirname + "/../data/" + "addressDetails" + reqAddressId + ".json";
	
    fs.readFile( jsonFileName, 'utf8', function (err, data) {
        console.log( data );
        var dataObject = JSON.parse(data);
        if (req.params.addressId === '400') {
            return next({"message":"4xx Err", "status":400});
        } else if (req.params.addressId === '400') {
            return next({"message":"4xx Err", "status":400});
        } else if (req.params.addressId === '401') {
            return next({"message":"4xx Err", "status":401});
        } else if (req.params.addressId === '402') {
            return next({"message":"4xx Err", "status":402});
        } else if (req.params.addressId === '403') {
            return next({"message":"4xx Err", "status":403});
        } else if (req.params.addressId === '404') {
            return next({"message":"4xx Err", "status":404});
        } else if (req.params.addressId === '422') {
            return next({"message":"4xx Err", "status":422});
        } else if (req.params.addressId === '500') {
            return next({"message": "500 Err", "status": 500});
        }
        dataObject.id = req.params.addressId;
        res.set({'Content-Type':'application/json','Encodeing':'utf8'})
        res.end( JSON.stringify(dataObject,null,2) );
    });
})

module.exports = router;