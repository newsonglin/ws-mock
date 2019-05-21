var express = require('express');
var dateFormat = require('dateformat')
var util = require('util');
var router = express.Router();
var fs = require("fs");

var docsDataDir=__dirname + "/../public/documents/";

router.get('/generateDocument', function (req, res, next) {
    return next({"message":"Only post is allowed", "status":400});
})

router.post('/generateDocument', function (req, res, next) {
    if(util.isUndefined(req.body.documentId) || util.isUndefined(req.body.payload)){
        console.log("documentId and payloads are mandatory");
        return next({"message":"documentId and payloads are mandatory", "status":400});
    }
    var docId=req.body.documentId;
    console.log("generateDocument request: documentId="+docId);

     var filename=docsDataDir+dateFormat(new Date(),"yyyymmdd_hhMMss_l")+"_payload_"+docId+".xml";
     var decoded=Buffer.from(req.body.payload, 'base64').toString('utf8');
     fs.writeFile(filename,decoded, function(err) {
         if(err) {
             return console.log(err);
         }
         console.log("The payload "+docId+" was saved to "+filename);
     });
    res.set({'Content-Type':'application/json','Encodeing':'utf8'})
    res.end( JSON.stringify({result:true, message:null},null,2) );
})

module.exports = router;