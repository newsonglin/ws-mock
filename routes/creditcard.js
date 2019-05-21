var express = require('express');
var util = require('util');
var router = express.Router();
var fs = require("fs");
var needle = require('needle');
var PropertiesReader = require('properties-reader');
var appSettings = PropertiesReader(__dirname+'/../settings.properties');

var dpsURL=appSettings.get('dps.url');
console.log("DPS URL: "+dpsURL);

var options = {
    headers: { 'Content-Type': 'application/json', 'accept':'text/plain' }
  }

router.post('/retrievePaymentPage', function (req, res, next) {
    needle('post', dpsURL+req.originalUrl, req.body, options )
        .then(function(resp) {
            console.log(resp.body);
            console.log("resp.statusCode:"+resp.statusCode);
            res.set({'Content-Type':'application/json','Encodeing':'utf8'});
            res.status(resp.statusCode);
            res.end(JSON.stringify(resp.body,null,2) );
            })
        .catch(function(err) { console.error(err) ; return next({"message": err, "status":500})});
});


router.post('/submitPayment', function (req, res, next) {
    needle('post', dpsURL+req.originalUrl, req.body, options )
    .then(function(resp) {
        console.log(resp.body);
        console.log("resp.statusCode:"+resp.statusCode);
        res.set({'Content-Type':'application/json','Encodeing':'utf8'});
        res.status(resp.statusCode);
        res.end(JSON.stringify(resp.body,null,2) );
        })
    .catch(function(err) { console.error(err) ; return next({"message": err, "status":500})});
})

router.get('/getPaymentPageResult', function (req, res, next) {
    needle('get', dpsURL+req.originalUrl)
        .then(function(resp) {
        res.set({'Content-Type':'application/json','Encodeing':'utf8'});
        res.status(resp.statusCode);
        res.end(JSON.stringify(resp.body,null,2));
         })
        .catch(function(err) { console.error(err) ; return next({"message": err, "status":500})});
 });

module.exports = router;