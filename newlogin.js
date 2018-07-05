	var http = require("http");
	var express = require('express');
	var app = express();
	var mysql      = require('mysql');
	var bodyParser = require('body-parser');
	const ngrok = require('ngrok');
    const url =  ngrok.connect();

	
	var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'system',
  database : 'senddb3'
});


connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var server = app.listen(3000, "localhost", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

var router = express.Router();	
router.post('/users/register', function (req, res) {
	console.log("req",req.body);
  var today = new Date();
  var users={
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email":req.body.email,
    "password":req.body.password,
    "created":today,
    "modified":today
  }
	
   connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
	  
		  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
});


app.post('/users/register', function (req, res) {
	
	console.log("req",req.body);
  var today = new Date();
  var users={
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email":req.body.email,
    "password":req.body.password,
    "created":today,
    "modified":today
  }
   connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
	  
		  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
	  
	})
});




//rest api to create a new job_category record into mysql database
app.post('/users/login', function (req, res) {
   console.log("req",req.body);
   var email= req.body.email;
  var password = req.body.password;
  
  
  connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
	  
	    if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
     console.log('The solution is: ', results);
    if(results.length >0){
      if(password == password){
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
    
	  
    })
});
	
var router = express.Router();
	
    router.post('/users', function (req, res) {
   console.log("req",req.body);
  
  connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
	  
      if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
     console.log('The solution is: ', results);
    if(results.length >0){
      if(password == password){
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
	  
    })
	
})

});








	
	
	
	
	
