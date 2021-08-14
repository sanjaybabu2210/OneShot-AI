var express = require("express");
var app = express();
var cors = require('cors');
app.use(cors()) // Use this after the variable declaration

var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require('path');
var methodOverride = require("method-override");


require('dotenv').config();

var college = require('./models/College');
var student = require('./models/Students');
app.use(express.static('public'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



var uri = process.env.ATLAS;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB!!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

app.set("view engine","ejs")

var methodOverride=require("method-override");

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));


app.use(express.static(path.join(__dirname, 'public/')));


app.get("/allCollege",function(req,res){

    college.find({},function(err, found) {
        if(err)
        console.log(err);
         else{
             //console.log(found);
             res.json({coll:found});
         }
    });

});

app.get("/college/:id",function(req,res){

    var id = req.params.id;

    college.find({id: id},function(err, colleges) {
        if(err)
        console.log(err);
        else{
           var cities = colleges[0].city;
           console.log(cities);
        //    similar = [];
        //    studentlist = [];
           

           college.find({ $and: [ {city: cities},{id: { '$ne': id }}]}).then(similarColl => {
                    // console.log("simcol",similarColl);
                    // similar = similarColl;
                    // console.log("similar",similar);

                    student.find({collegeId:id}).then(studlist => {


                        res.json({colleges:colleges, stud:studlist, similarColl: similarColl});
                    })
                    
           })


            
          


           
        }
    });

});
app.get("/allStudents",function(req,res){

    student.find({},function(err, found) {
        if(err)
        console.log(err);
         else{
             //console.log(found);
             res.json({students:found});
         }
    });

});
app.get("/student/:id",function(req,res){

    var id = req.params.id;
    student.find({id:id},function(err, found) {
        if(err)
        console.log(err);
         else{
             //console.log(found);
             res.json({student:found});
         }
    });

});

app.get("/collegeCourse/:id",function(req,res){

    res.render('forms.ejs');

});
app.get("/collegeState/:id",function(req,res){

    res.render('forms.ejs');

});

app.post("/addColleges",function(req,res){
    
     var id = req.body.id;
     var name = req.body.name;
     var year = req.body.year;
     var city = req.body.city;
     var state = req.body.state;
     var country = req.body.country;
     var course = JSON.stringify(req.body.courses);
     var nofstudends = req.body.students;
     
     var coursed = course.split(',');

     var newcollege = {
         id : id,
         name: name,
         year: year,
         city: city,
         state: state,
         country: country,
         nofstudends: nofstudends,
         courses: coursed

     }

     college.create(newcollege, function(err,coll){

        if(err)
            console.log(err);
        else{
            // res.send("success");
            res.redirect('/');
        }
     });


     
 });

 app.post("/addStudents", function(req,res){

    var id = req.body.id;
    var name = req.body.name;
    var batchYR = parseInt(req.body.year);
    var collegeId = req.body.collegeId;
    
    var skill = req.body.skills;
    var skills = skill.split(',');

    var newStudent = {
        id : id,
        name: name,
        batchYR: batchYR,
        collegeId: collegeId,
       
        
        skills: skills

    }

    student.create(newStudent, function(err,coll){

       if(err)
           console.log(err);
       else{
           res.send("success");
           
       }
    });

    
 });












 app.listen(process.env.PORT ||5000,function(){
    console.log("OneShot App started");
});


