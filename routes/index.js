var express = require('express');
var router = express.Router();
var fs = require("fs");

var payloadDataDir=__dirname + "/../public/documents";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tower Mocks Services' });
});

router.get('/documents', function(req, res, next) {
    fs.readdir(payloadDataDir, function(err, items) {
            res.render('list', { title: 'Docgen Requests', linkList: items});
    });

});

module.exports = router;
