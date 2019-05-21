var express = require('express');
var util = require('util');
var router = express.Router();
var fs = require("fs");

var badHttpStatus=['400','401','402','403','404','422','500'];
var vehicleData = [];
var vehicleMap = [];
var makesMap = [];

fs.readFile(__dirname + "/../data/vehicle/" + "vehicles.json", 'utf8', function (err, data) {
    vehicleData = JSON.parse(data);
    vehicleMap['car']=vehicleData.vehicles.filter(function (vehicle){
                            return vehicle.vehicleClass==='car';
                      });
    vehicleMap['motorcycle']=vehicleData.vehicles.filter(function (vehicle){
                                   return vehicle.vehicleClass==='motorcycle';
    });
    makesMap['car']=vehicleMap['car'].map(function (vehicle){return vehicle.make}).filter(distinct);
    makesMap['motorcycle']=vehicleMap['motorcycle'].map(function (vehicle){return vehicle.make}).filter(distinct);

     console.log('vehicleMap[motorcycle]='+vehicleMap['motorcycle'].length);
     console.log('makesMap[motorcycle]='+makesMap['motorcycle'].length);
     console.log('vehicleMap[car]='+vehicleMap['car'].length);
     console.log('makesMap[car]='+makesMap['car'].length);
     console.log('vehicleData='+vehicleData.vehicles.length);
});


router.get('/findByRego/:registrationNumber', function (req, res, next) {
        if (badHttpStatus.indexOf(req.params.registrationNumber) !== -1) {
            mockHttpErrorStatus(req.params.registrationNumber, next);
            return;
        }

		var applicableVehicles=[];
        if(req.query.vehicleClass==="car" || req.query.vehicleClass==="motorcycle" ){
            applicableVehicles=vehicleMap[req.query.vehicleClass];
        }
        var vehicle = applicableVehicles.find(function (vehicle) {
            return vehicle.registrationNumber === req.params.registrationNumber;
        });

		if(vehicle){
        	vehicle = Object.assign({}, vehicle);
		    delete vehicle.vehicleClass;
		    delete vehicle.registrationNumber;
			delete vehicle.defaultValue;
			delete vehicle.agreedValueMin;
			delete vehicle.agreedValueMax;
			delete vehicle.hotlistFlags;
			delete vehicle.characteristics;
		}else {
			return next({"message":req.params.registrationNumber+" not found", "status":404});
		}
		
        res.set({'Content-Type': 'application/json'});
        res.end(JSON.stringify(vehicle, null, 2));
});

router.get('/makes', function (req, res,next)  {
        if (util.isUndefined(req.query.vehicleClass)) {
            return next({"message":"Query for vehicleClass is not passed", "status":400});
        }
        //console.log(req.query.vehicleClass);
        var makes=[];
        if(req.query.vehicleClass==="car" || req.query.vehicleClass==="motorcycle" ){
            makes=makesMap[req.query.vehicleClass];
        }

        var result={};
        result.makes=makes;

        res.set({'Content-Type':'application/json'});
        res.end( JSON.stringify(result,null,2) );
});

router.get('/makes/:make/models', function (req, res, next) {
        if (util.isUndefined(req.query.vehicleClass)) {
            return next({"message": "Query for vehicleClass is not passed", "status": 400});
        }

        if (badHttpStatus.indexOf(req.params.make) !== -1) {
            mockHttpErrorStatus(req.params.make, next);
            return;
        }

        var applicableVehicles = vehicleMap[req.query.vehicleClass].filter(function (vehicle) {
            return vehicle.make === req.params.make;
        });

        var allModels=applicableVehicles.map(function (vehicle){return vehicle.model});

        var models=allModels.filter(distinct);

        var result={};
        result.models=models;

        res.set({'Content-Type': 'application/json'});
        res.end(JSON.stringify(result, null, 2));
});

router.get('/makes/:make/models/:model/years', function (req, res, next)  {
        if (util.isUndefined(req.query.vehicleClass)) {
            return next({"message":"Query for vehicleClass is not passed", "status":400});
        }

        if (badHttpStatus.indexOf(req.params.make) !== -1) {
            mockHttpErrorStatus(req.params.make, next);
            return;
        }

        var applicableVehicles = vehicleMap[req.query.vehicleClass].filter(function (vehicle) {
            return vehicle.make === req.params.make && vehicle.model === req.params.model;
        });

        var allYears=applicableVehicles.map(function (vehicle){return vehicle.year});

        var years=allYears.filter(distinct);

        var result={};
        result.years=years;

        res.set({'Content-Type':'application/json'});
        res.end( JSON.stringify(result,null,2) );
});


router.get('/makes/:make/models/:model/years/:year/bodyStyles', function (req, res, next)  {
        if (util.isUndefined(req.query.vehicleClass)) {
            return next({"message":"Query for vehicleClass is not passed", "status":400});
        }

        if (badHttpStatus.indexOf(req.params.make) !== -1) {
            mockHttpErrorStatus(req.params.make, next);
            return;
        }
        var applicableVehicles = vehicleMap[req.query.vehicleClass].filter(function (vehicle) {
            return vehicle.make === req.params.make && vehicle.model === req.params.model && vehicle.year==req.params.year;
        });

        var allStyles=applicableVehicles.map(function (vehicle){return vehicle.bodyStyle});

        var styles=allStyles.filter(distinct);

        var result={};
        result.styles=styles;

        res.set({'Content-Type':'application/json'});
        res.end( JSON.stringify(result,null,2) );
});

router.get('/makes/:make/models/:model/years/:year/bodyStyles/:bodyStyle/types', function (req, res,next)  {
        if (util.isUndefined(req.query.vehicleClass)) {
            return next({"message":"Query for vehicleClass is not passed", "status":400});
        }

        if (badHttpStatus.indexOf(req.params.make) !== -1) {
            mockHttpErrorStatus(req.params.make, next);
            return;
        }

        var applicableVehicles = vehicleMap[req.query.vehicleClass].filter(function (vehicle) {
            return vehicle.make === req.params.make && vehicle.model === req.params.model && vehicle.year==req.params.year &&vehicle.bodyStyle===req.params.bodyStyle;
        });

        var allTypes=applicableVehicles.map(function (vehicle){
            var myType={};
            myType.redbookReference=vehicle.redbookReference;
            myType.type=vehicle.type;
            return myType
        });

        var types=allTypes.filter(distinct);

        var result={};
        result.types=types;

        res.set({'Content-Type':'application/json'});
        res.end( JSON.stringify(result,null,2) );
});

router.get('/redbookReference/:redbookReference', function (req, res,next)  {
        if (badHttpStatus.indexOf(req.params.redbookReference) !== -1) {
            mockHttpErrorStatus(req.params.redbookReference, next);
            return;
        }

        var vehicle = vehicleData.vehicles.find(function (vehicle) {
            return vehicle.redbookReference === req.params.redbookReference;
        });

		if(vehicle){
		    vehicle = Object.assign({}, vehicle);
		    delete vehicle.vehicleClass;
		    delete vehicle.registrationNumber;
		}
		
        res.set({'Content-Type':'application/json'});
        res.end( JSON.stringify(vehicle,null,2) );
});


/**
 * To remove duplicate items from an array
 * @param value
 * @param index
 * @param self
 * @returns {boolean}
 */
function distinct(value, index, self) {
    return self.indexOf(value) === index;
}

/**
 * Mock http error status, this can be moved to common or general
 * @param req the request parameter
 * @param next I don't know this
 * @returns {*} nothing will be returned
 */
function mockHttpErrorStatus(req,next){
    if (req === '400') {
        return next({"message":"4xx Err", "status":400});
    } else if (req === '401') {
        return next({"message":"4xx Err", "status":401});
    } else if (req === '402') {
        return next({"message":"4xx Err", "status":402});
    } else if (req === '403') {
        return next({"message":"4xx Err", "status":403});
    } else if (req === '404') {
        return next({"message":"4xx Err", "status":404});
    } else if (req === '422') {
        return next({"message":"4xx Err", "status":422});
    } else if (req === '500') {
        return next({"message": "5xx Err", "status": 500});
    }
}

module.exports = router;