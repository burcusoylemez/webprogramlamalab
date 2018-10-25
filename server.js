var express = require('express');
var mysql = require('mysql');
var app = express();
var path    = require("path");
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT=8080; 
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'RootRoot55.',
    database: 'node'
});
connection.connect(function (err) {
    if(err) throw err;
    console.log("Bağlantı sağlandı");
})
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/node.html'));
});
app.post('/kaydet', 
    function(req, res) {
        var ad=req.body.ad;
        var soyad=req.body.soyad;
        var mail=req.body.mail;
        let sqlSorgusu = "INSERT INTO kullanici (kullaniciAd, kullaniciSoyad, kullaniciMail )  VALUE('"+ad+"', '"+soyad+"','"+mail+"')";
        connection.query(sqlSorgusu, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
        });
        res.sendFile(path.join(__dirname+'/node.html'));
    }
);
app.listen(8080);
console.log("Running at Port 8080");


