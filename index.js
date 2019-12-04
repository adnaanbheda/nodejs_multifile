const express = require('express');
var multer = require('multer');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        if (file.originalname.includes(".jpg") == true) {
            callback(null, file.originalname)
        }
        else {
            callback(null, file.originalname + '-' + Date.now() + '.jpg');
        }
    }
});

var upload = multer({ storage: storage }).array('userPhoto', 5);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/upload', function (req, res) {
    upload(req, res, function (err) {
        console.log(req.body);
        console.log(req.files);
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(3000, function () {
    console.log("Working on port 3000");
});