var express = require('express');
var util = require('util');
var router = express.Router();
var fs = require("fs");

var addressDataDir=__dirname + "/../data/address/";
var addressFiles = [];
fs.readdir(addressDataDir, function(err, items) {
    addressFiles=items;
    /*console.log("Known address files: ");
    for (var i=0; i<items.length; i++) {
        console.log(items[i]);
    }*/
});

router.get('/findAddress', function (req, res, next) {
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
    //For performance testing
    if(req.query.addressQuery == 'Performance') {
        fs.readFile(addressDataDir + "findAddressPerf.json", 'utf8', function (err, data) {
            var dataObject = JSON.parse(data);
            var matchedData=[];
            for (var i=0; i<dataObject.length; i++) {
                if(dataObject[i].description.toLowerCase().indexOf(req.query.addressQuery.toLowerCase())>-1)
                    dataObject[i].id = Math.floor((Math.random() * 8000000) + 1000000)
                    //console.log(dataObject[i]);
                    matchedData.push(dataObject[i]);
             }
            res.set({'Content-Type':'application/json','Encodeing':'utf8'})
            res.end( JSON.stringify(matchedData,null,2) );
        });
        return;
    }

    fs.readFile(addressDataDir + "findAddress.json", 'utf8', function (err, data) {
        var dataObject = JSON.parse(data);
        var matchedData=[];
        for (var i=0; i<dataObject.length; i++) {
            if(dataObject[i].description.toLowerCase().indexOf(req.query.addressQuery.toLowerCase())>-1)
                //console.log(dataObject[i]);
                matchedData.push(dataObject[i]);
         }
        res.set({'Content-Type':'application/json','Encodeing':'utf8'})
        res.end( JSON.stringify(matchedData,null,2) );
    });
})

router.get('/:addressId',function (req, res, next) {
	var reqAddressId = req.params.addressId;
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
    } else if (req.params.addressId === '404' || req.params.addressId === '3') {
        return next({"message":"4xx Err", "status":404});
    } else if (req.params.addressId === '422') {
        return next({"message":"4xx Err", "status":422});
    } else if (req.params.addressId === '500') {
        return next({"message": "500 Err", "status": 500});
    }

    var jsonFileName =  "addressDetails" + reqAddressId + ".json";
    //For Performance tests
    if (reqAddressId >= 1000000 && reqAddressId <= 9000000) {
        jsonFileName = "addressDetailsPerf.json";
    }

    if(req.params.addressId>3 && req.params.addressId<30){
        jsonFileName =  "addressDetailsTemplate.json";
    }

	if(addressFiles.indexOf(jsonFileName) > -1){
        fs.readFile( addressDataDir +jsonFileName, 'utf8', function (err, data) {
            console.log( data );
            var dataObject = JSON.parse(data);
            dataObject.id = req.params.addressId;
            //For Performance tests
            if (req.params.addressId >= 1000000 && req.params.addressId <= 9000000) {
                dataObject.streetName = "Perf Street" + req.params.addressId;
            }
            if(req.params.addressId>3 && req.params.addressId<30){
                dataObject.streetNumber=253+parseInt(req.params.addressId);
                dataObject.characteristics.Address.HouseNumberName=dataObject.streetNumber;
                dataObject.characteristics.Address.PostalSummary.Line1=dataObject.streetNumber+" TestStreetName";
            }
            res.set({'Content-Type':'application/json','Encodeing':'utf8'})
            res.end( JSON.stringify(dataObject,null,2) );
        });
	}else{
	    return next({"message":"4xx Err", "status":404});
	}
})

module.exports = router;