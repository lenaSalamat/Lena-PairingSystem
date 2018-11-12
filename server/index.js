const express = require('express');
 let  app = express();
 const router = express.Router();
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
var db=require('../database-mongo/index.js')
var db2=require('../database-mongo/Pairing.js')

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.get("/",function(req,res){
  res.render('index')
})

app.get('/Students',function(req,res){
 	
	db.selectAll(function(err, data){
	if (err) {
		res.sendStatus(500)
	}else{
		res.json(data);
	}
	})
 });


app.route("/Students")
    .get(function (req, res) { 
     db.retrieveAll(req, res)
})
    .post(function (req, res) {
     db.addStudent(req, res)
})
   .put(function (req, res) {
     db.updateOne(req, res)
})
   .delete(function (req, res) {
     db.deleteOne(req, res)
})


 app.route("/Pairs")
    .get(function (req, res) { 
     db2.retrieveAllPai(req, res)
})
    .post(function (req, res) {
     db2.addPairs(req, res)
})   

//    app.route("/Students/:id")
//    .put(function (req, res) {
//      db.updateOne(req, res)
// })
//    router.put('/update', (req, res, next) => {
//     db.findById(req.body.id, (err, student) =>{
//         if(err)
//             res.status(500).json({errmsg: err})
//         student.studentname = req.body.studentname;
//         student.studentlevel= req.body.studentlevel; 
//         student.save((err, student) =>{
//             if(err)
//                 res.status(500).json({errmsg: err})
//             res.status(200).json({msg: student});    
//         })   
//     })
    
// })




 let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});



