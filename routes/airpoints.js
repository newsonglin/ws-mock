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

    if (req.query.airpointsNumber !== '123456') {
        airpointsResult.result = false;
        airpointsResult.message = "airpoints membership number ["+req.query.airpointsNumber+"] is not found"
    } else if (req.query.firstName !== 'Isaac') {
        airpointsResult.result = false;
        airpointsResult.message = "The first name of airpoints membership doesn't match"
    } else if (req.query.lastName !== 'Wu') {
        airpointsResult.result = false;
        airpointsResult.message = "The last name of airpoints membership doesn't match"
    }
    res.end( JSON.stringify(airpointsResult,null,2) );

});

module.exports = router;