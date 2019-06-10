var express = require('express');
var util = require('util');
var router = express.Router();
var fs = require("fs");
var dateFormat = require('dateformat');
var PropertiesReader = require('properties-reader');
var appSettings = PropertiesReader(__dirname + '/../settings.properties');

var dpsURL = appSettings.get('dps.url');
console.log("DPS URL: " + dpsURL);

var isURL = require('is-url');
const uuidv4 = require('uuid/v4');



var ccDataDir = __dirname + "/../data/credit-card/";

router.post('/ccPay', function(req, res, next) {
    if (util.isUndefined(req.query.request)) {
        return next({ "message": "Query string is not passed", "status": 400 });
    }

    var requestKey = req.query.request;
    var filename = ccDataDir + requestKey + ".json";
    var dataObject = require(filename);

    res.render('creditCardPayment', {
        title: 'Tower Mocks Credit Card Payment',
        requestKey: req.query.request,
        amount: dataObject.amount
    });
});

router.post('/ccPayProcess', function(req, res, next) {
    var requestKey = req.body.requestKey;
    var successUrl;
    var filename = ccDataDir + requestKey + ".json";
    var dataObject = require(filename);
    console.log(dataObject);
    if (dataObject.successURL.indexOf("?") != -1) {
        successUrl = dataObject.successURL + '&result=' + requestKey;
    } else {
        successUrl = dataObject.successURL + '?result=' + requestKey;
    }

    if (req.body.IIdVal == "Cancel") {
        res.redirect(successUrl)
    } else {
        dataObject.CardNumber = req.body.CardNumber;
        dataObject.CardHolderName = req.body.CardHolderName;
        dataObject.DateExpiry_1 = req.body.DateExpiry_1;
        dataObject.DateExpiry_2 = req.body.DateExpiry_2;

        dataObject.transactionReference = "0b" + dateFormat(new Date(), "yyyymmddHHMMss");

        fs.writeFile(filename, JSON.stringify(dataObject), function(err) {
            if (err) {
                return console.log(err);
            }
        });

        res.render('creditCardPayApproved', {
            title: 'Tower Mocks Transaction Approved',
            transactionReference: dataObject.transactionReference,
            nextUrl: successUrl
        });
    }


});


router.post('/retrievePaymentPage', function(req, res, next) {
    if (util.isUndefined(req.body.successURL) || !isURL(req.body.successURL)) {
        return next({ "message": "Invalid successURL", "status": 400 });
    }
    if (util.isUndefined(req.body.failURL) || !isURL(req.body.failURL)) {
        return next({ "message": "Invalid failURL", "status": 400 });
    }

    if (util.isUndefined(req.body.amount) || isNaN(req.body.amount)) {
        return next({ "message": "Amount format invalid", "status": 400 });
    }

    var requestKey = dateFormat(new Date(), "yyyymmddHHMMssl") + "CC_" + uuidv4();

    var filename = ccDataDir + requestKey + ".json";
    fs.writeFile(filename, JSON.stringify(req.body), function(err) {
        if (err) {
            return console.log(err);
        }
    });

    var paymentPage = {};
    paymentPage.url = dpsURL + "/billingService/v1/CreditCard/ccPay?request=" + requestKey;
    res.set({ 'Content-Type': 'application/json', 'Encodeing': 'utf8' });
    res.end(JSON.stringify(paymentPage, null, 2));


});


router.post('/submitPayment', function(req, res, next) {


    if (util.isUndefined(req.body.transactionId)) {
        return next({ "message": "transactionId is required", "status": 400 });
    }
    if (util.isUndefined(req.body.billingToken)) {
        return next({ "message": "billingToken is required", "status": 400 });
    }

    const result = {};
    result.status = "failure";
    result.transactionReference = "0000000b00000000";

    var files = fs.readdirSync(ccDataDir);
    for (var i = 0; i < files.length; i++) {
        var fileObject = {};
        try {
            fileObject = JSON.parse(fs.readFileSync(ccDataDir + files[i], "utf8"));
        } catch (e) {
            //No worry, this is just a file parse error, log it, no need stop the function
            console.error(e);
        }
        if (req.body.billingToken === fileObject.billingToken) {
            result.status = "success";
            result.transactionReference = fileObject.transactionReference;
            break;
        }
    }

    res.set({ 'Content-Type': 'application/json', 'Encodeing': 'utf8' });


    res.end(JSON.stringify(result, null, 2));
});

router.get('/getPaymentPageResult', function(req, res, next) {
    if (util.isUndefined(req.query.sourceSystem)) {
        return next({ "message": "Parameter sourceSystem is required", "status": 400 });
    }
    if (util.isUndefined(req.query.responseCode)) {
        return next({ "message": "Parameter responseCode is required", "status": 400 });
    }

    var filename = ccDataDir + req.query.responseCode + ".json";

    if (!fs.existsSync(filename)) {
        return next({ "message": "Parameter responseCode is invalid", "status": 400 });
    }

    var dataObject = require(filename);

    var result = {};
    result.success = true;
    result.transactionId = dataObject.transactionId;
    result.billingToken = "00" + dateFormat(new Date(), "yyyymmddHHMMss");

    if (util.isUndefined(dataObject.transactionReference)) {
        result.transactionReference = "0b" + dateFormat(new Date(), "yyyymmddHHMMss");
    } else {
        result.transactionReference = dataObject.transactionReference;
    }

    result.creditCardNumber = dataObject.CardNumber;
    result.cardHolderName = dataObject.CardHolderName;
    result.cardExpiryDate = dataObject.DateExpiry_1 + dataObject.DateExpiry_2;
    result.cardName = "Visa"; // hard code here?
    result.message = "APPROVED"; // hard code here?
    result.billingId = dataObject.billingId;
    result.policyId = dataObject.policyId;
    result.claimId = dataObject.claimId;


    //Write billing token and transaction reference back to file
    dataObject.billingToken = result.billingToken;
    dataObject.transactionReference = result.transactionReference;
    fs.writeFile(filename, JSON.stringify(dataObject), function(err) {
        if (err) {
            return console.log(err);
        }
    });


    res.set({ 'Content-Type': 'application/json', 'Encodeing': 'utf8' });

    res.end(JSON.stringify(result, null, 2));
});

module.exports = router;