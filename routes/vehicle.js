var express = require('express');
var util = require('util');
var router = express.Router();
var fs = require("fs");

router.get('/findByRego/:registrationNumber', function (req, res,next)  {
    fs.readFile( __dirname + "/../data/" + "findByRego.json", 'utf8', function (err, data) {
        console.log( data );
        var dataObject = JSON.parse(data);
        if (req.params.registrationNumber === '400') {
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
            return next({"message": "5xx Err", "status": 500});
        }
        dataObject.type = req.params.registrationNumber;
        res.set({'Content-Type':'application/json','Encodeing':'utf8'})
        res.end( JSON.stringify(dataObject,null,2) );
    });
});

router.get('/makes', function (req, res,next)  {
    fs.readFile( __dirname + "/../data/" + "makes.json", 'utf8', function (err, data) {
        console.log( data );
        var dataObject = JSON.parse(data);
        if (util.isUndefined(req.query.vehicleClass)) {
            return next({"message":"Query for vehicleClass is not passed", "status":400});
        }
        dataObject.makes[0] += (' query:' + req.query.vehicleClass );
        res.set({'Content-Type':'application/json','Encodeing':'utf8'})
        res.end( JSON.stringify(dataObject,null,2) );
    });
});

router.get('/makes/:make/models', function (req, res, next)  {
    fs.readFile( __dirname + "/../data/" + "models.json", 'utf8', function (err, data) {
        console.log( data );
        var dataObject = JSON.parse(data);
        if (req.params.make === '400') {
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
            return next({"message": "5xx Err", "status": 500});
        }
        dataObject.models[0] += req.params.make;
        if (util.isUndefined(req.query.vehicleClass)) {
            return next({"message":"Query for vehicleClass is not passed", "status":400});
        }
        dataObject.models[0] += (' query:' + req.query.vehicleClass );
        res.set({'Content-Type':'application/json','Encodeing':'utf8'})
        res.end( JSON.stringify(dataObject,null,2) );
    });
});

router.get('/makes/:make/models/:model/years', function (req, res, next)  {
    fs.readFile( __dirname + "/../data/" + "year.json", 'utf8', function (err, data) {
        console.log( data );
        var dataObject = JSON.parse(data);
        if (req.params.make === '400') {
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
            return next({"message": "5xx Err", "status": 500});
        }
        if (util.isUndefined(req.query.vehicleClass)) {
            return next({"message":"Query for vehicleClass is not passed", "status":400});
        }
        res.set({'Content-Type':'application/json','Encodeing':'utf8'})
        res.end( JSON.stringify(dataObject,null,2) );
    });
});

router.get('/makes/:make/models/:model/years/:year/bodyStyles', function (req, res, next)  {
    fs.readFile( __dirname + "/../data/" + "bodyStyles.json", 'utf8', function (err, data) {
        console.log( data );
        var dataObject = JSON.parse(data);
        if (req.params.make === '400') {
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
            return next({"message": "5xx Err", "status": 500});
        }
        if (util.isUndefined(req.query.vehicleClass)) {
            return next({"message":"Query for vehicleClass is not passed", "status":400});
        }
        dataObject.styles[0] += (' query:' + req.query.vehicleClass );
        res.set({'Content-Type':'application/json','Encodeing':'utf8'})
        res.end( JSON.stringify(dataObject,null,2) );
    });
});

router.get('/makes/:make/models/:model/years/:year/bodyStyles/:bodyStyle/types', function (req, res,next)  {
    fs.readFile( __dirname + "/../data/" + "types.json", 'utf8', function (err, data) {
        console.log( data );
        var dataObject = JSON.parse(data);
        if (req.params.make === '400') {
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
            return next({"message": "5xx Err", "status": 500});
        }
        if (util.isUndefined(req.query.vehicleClass)) {
            return next({"message":"Query for vehicleClass is not passed", "status":400});
        }
        dataObject.types[0].description += (' query:' + req.query.vehicleClass );
        res.set({'Content-Type':'application/json','Encodeing':'utf8'})
        res.end( JSON.stringify(dataObject,null,2) );
    });
});

router.get('/redbookReference/:redbookReference', function (req, res,next)  {
    fs.readFile( __dirname + "/../data/" + "redbookReference.json", 'utf8', function (err, data) {
        console.log( data );
        var dataObject = JSON.parse(data);
        dataObject.redbookReference= req.params.redbookReference
        if (req.params.redbookReference === '400') {
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
            return next({"message": "5xx Err", "status": 500});
        }
        res.set({'Content-Type':'application/json','Encodeing':'utf8'})
        res.end( JSON.stringify(dataObject,null,2) );
    });
});


module.exports = router;