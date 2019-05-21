var express = require('express');
var util = require('util');
var router = express.Router();
var fs = require("fs");

var bankData = []
fs.readFile( __dirname + "/../data/billing/bank_data.json" , 'utf8', function (err, data) {
        bankData = JSON.parse(data);
        console.log("Billing BankAccounts: "+bankData.length)
});

var defaultResponse = {
                        "bankId": ["BankId has to be numeric and the length has to be 2"],
                        "bankBranch": ["BankBranch has to be numeric and the length has to be 4"],
                        "accountNumber": ["AccountNumber has to be numeric and the length has to be between 7 and 8"],
                        "accountSuffix": ["AccountSuffix has to be numeric and the length has to be between 2 and 4"]
                      };

router.post('/validateBankAccountNumber', function (req, res, next) {
    if(util.isUndefined(req.body.bankId) || util.isUndefined(req.body.bankBranch)
        || util.isUndefined(req.body.accountNumber) || util.isUndefined(req.body.accountSuffix)){
        return next({"message": JSON.stringify(defaultResponse), "status":400})
    }
    console.log("req.body:"+JSON.stringify(req.body))
    var bankId=req.body.bankId;
    var bankBranch=req.body.bankBranch;
    var accountNumber=req.body.accountNumber;
    var accountSuffix=req.body.accountSuffix;

   var bank = bankData.find(function (data) {
               return data.bankId == bankId
                        &&  data.bankBranch == bankBranch
                        &&  data.accountNumber == accountNumber
                        &&  data.accountSuffix == accountSuffix;
           });
    if(bank){
        if(bank.responseCode!=200){
            return next({"message": JSON.stringify(bank.response), "status":400});
        }else{
            res.set({'Content-Type':'application/json','Encodeing':'utf8'})
            res.end( JSON.stringify(bank.response,null,2) );
        }
    }
    return next({"message": JSON.stringify(defaultResponse), "status":400})
})

module.exports = router;