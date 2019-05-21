var express = require('express');
var util = require('util');
var router = express.Router();
var fs = require("fs");

var suburbData = []
fs.readFile( __dirname + "/../data/address/findSuburbData.json" , 'utf8', function (err, data) {
        //console.log("Suburb Data");
        //console.log( data );
        suburbData = JSON.parse(data);
});

router.get('/findSuburb', function (req, res, next) {
	if (util.isUndefined(req.query.suburbQuery)) {
        return next({"message":"Query string is not passed", "status":400});
    }
    var suburbQueryStr = req.query.suburbQuery.toLowerCase();
    var matchedData=[];
    for (var i=0; i<suburbData.length; i++) {
        if(suburbData[i].suburb.toLowerCase().indexOf(suburbQueryStr)>-1 || suburbData[i].city.toLowerCase().indexOf(suburbQueryStr)>-1 || suburbData[i].postcode.toLowerCase().indexOf(suburbQueryStr)>-1){
            //console.log(dataObject[i]);
            matchedData.push(suburbData[i]);
        }
    }
    res.set({'Content-Type':'application/json','Encodeing':'utf8'})
    res.end( JSON.stringify(matchedData,null,2) );
})

module.exports = router;