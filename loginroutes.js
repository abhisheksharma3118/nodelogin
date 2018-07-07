var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'system',
  database : 'senddb3'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
	
}
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var server = app.listen(3000, "localhost", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});




//register 
exports.register = function(req,res){
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
}

//login
exports.login = function(req,res){
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
  });
}

//job category
var router = express.Router();
router.get('/job_category', function (req, res) {
   connection.query('select * from job_category', function (error, results, fields) {
	  if (error) throw error;
	  res.send(JSON.stringify(results));    
	});
});

//rest api to get all job_categories
app.get('/job_category', function (req, res) {
   connection.query('select * from job_category', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to get a single job_category
app.get('/job_category/:category_id', function (req, res) {
   connection.query('select * from job_category where category_Id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to create a new job_category record into mysql database
app.post('/job_category', function (req, res) {
   console.log("req",req.body);
  
  var job_category={
    "category":req.body.category,
    
  }
  connection.query('INSERT INTO job_category SET ?',job_category, function (error, results, fields) {
  if (error) throw error ;
    res.end(JSON.stringify(results))
	  
    })
	
});

//rest api to get jobform_list
var router = express.Router();
router.get('/jobform_list/it', function (req, res) {
   connection.query("select * from jobform_list  WHERE category = 'it'", function (error, results, fields) {
	  if (error) throw error;
	  res.send(JSON.stringify(results));    
	});
});

var router = express.Router();
router.get('/jobform_list/non_it', function (req, res) {
   connection.query("select * from jobform_list  WHERE category = 'non_it'", function (error, results, fields) {
	  if (error) throw error;
	  res.send(JSON.stringify(results));    
	});
});



//rest api to get all jobform_list
app.get('/jobform_list', function (req, res) {
   connection.query('select * from jobform_list', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to get a single jobform_list
app.get('/jobform_list/it', function (req, res) {
   connection.query("select * from jobform_list WHERE category = 'it'",  function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to get a single job_category
app.get('/jobform_list/non_it', function (req, res) {
   connection.query("select * from jobform_list  WHERE category = 'non_it'",  function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

app.post('/jobform_list/it', function (req, res) {
   connection.query("select * from jobform_list  WHERE category = 'it'",  function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});


app.post('/jobform_list/non_it', function (req, res) {
   connection.query("select * from jobform_list  WHERE category = 'non_it'",  function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});


//rest api to create a new job_category record into mysql database
app.post('/jobform_list', function (req, res) {
   console.log("req",req.body);
  
  var jobform_list={
    "category":req.body.category,
	"profile":req.body.profile,
	"company":req.body.company,
	"jobdescription":req.body.jobdescription,
	"location":req.body.location,
	"qualification":req.body.qualification,
	"experience":req.body.experience,
	"salary":req.body.salary,
	"vacancies":req.body.vacancies,
	"skills":req.body.skills
    
  }
  connection.query('INSERT INTO jobform_list SET ?',jobform_list, function (error, results, fields) {
  if (error) throw error ;
    res.end(JSON.stringify(results))
	  
    })
});
	
var router = express.Router();
	
    router.post('/jobform_list', function (req, res) {
   console.log("req",req.body);
  
  var jobform_list={
    "category":req.body.category,
	"profile":req.body.profile,
	"company":req.body.company,
	"jobdescription":req.body.jobdescription,
	"location":req.body.location,
	"qualification":req.body.qualification,
	"experience":req.body.experience,
	"salary":req.body.salary,
	"vacancies":req.body.vacancies,
	"skills":req.body.skills
    
  }
  connection.query('INSERT INTO jobform_list SET ?',jobform_list, function (error, results, fields) {
  if (error) throw error ;
    res.end(JSON.stringify(results))
	  
    })
	
});
