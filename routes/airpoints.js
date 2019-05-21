var express = require('express');
var util = require('util');
var router = express.Router();
var fs = require("fs");

router.get('/validateMembership', function (req, res,next)  {

    if (util.isUndefined(req.query.airpointsNumber)) {
        return next({"message":"airpointsNumber is not passed", "status":400});
    } else if (util.isUndefined(req.query.firstName)) {
        return next({"message": "firstName is not passed", "status": 400});
    } else if (util.isUndefined(req.query.lastName)) {
        return next({"message": "lastName is not passed", "status": 400});
    }

    var airpointsResult = {};
    airpointsResult.result = true;
    airpointsResult.validationMessage="Airpoints Number Is Valid.";
    console.log(req.query);
    if (req.query.airpointsNumber == '123456') {
        airpointsResult.result = false;
        airpointsResult.validationMessage = "airpoints membership number ["+req.query.airpointsNumber+"] is not found"
    } else if (req.query.firstName == 'InvalidFirstName') {
        airpointsResult.result = false;
        airpointsResult.validationMessage = "The first name of airpoints membership doesn't match"
    } else if (req.query.lastName == 'InvalidLastName') {
        airpointsResult.result = false;
        airpointsResult.validationMessage = "The last name of airpoints membership doesn't match"
    }
    res.set({'Content-Type':'application/json','Encodeing':'utf8'})
    res.end(JSON.stringify(airpointsResult,null,2) );
});

module.exports = router;