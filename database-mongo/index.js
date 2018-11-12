var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var studentSchema = mongoose.Schema({
 studentname: String,
 studentlevel: String
});

var Student = mongoose.model('Student', studentSchema);



// let save = (data) => {
  
//   var student= new Student({student:data})

//     student.save(function(err, data){
//       if(err){
//       console.log(err); 
//       }else{
//     console.log(data)
//       }
//     })
// }

let addStudent = function (req, res) {
    var studentname = req.body.studentname
    var studentlevel = req.body.studentlevel
    
    var newStudent = new Student({
        studentname: studentname,
        studentlevel: studentlevel
    })
    console.log(newStudent)

    newStudent.save(function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
        }
    })
}

let retrieveAll = function (req, res) {
    Student.find({}, function (err, data) {
        if (err) {
            console.log(err)
        }
        if (data.length === 0) {
            return res.sendStatus(404)
        }
        res.json(data)
    })
}

let updateOne = function (req, res) {
        console.log(req.body)
    var studentname = req.body.studentname
    var studentlevel = req.body.studentlevel
    var Obj = {
        studentname: req.body.studentname,
        studentlevel: req.body.studentlevel
    }
    Student.findOneAndUpdate({studentname: studentname}, Obj, function (err, data) {
        if (err) {
            console.log(err)
        }
        res.json(data)
    })
}

let deleteOne = function (req, res) {
     var studentname = req.body.studentname
    var studentlevel = req.body.studentlevel
    Student.findOneAndRemove({studentname: studentname}, function (err, deleted) {
        if (err) {
            console.log(err)
        }
        res.send(deleted)
    })
}

// db.put('/student/:id',function(req,res,next){
//     Student.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
//         Student.findOne({_id:req.params.id}).then(function(data){
//             res.send(data);
//         })
//     })
// })

let selectAll = (callback) => {
  Student.find({}, function(err, data) {
    if(err) {
      callback(err, null);
    } else {
      callback(null,data);
    }
  });
};
module.exports.selectAll = selectAll;
module.exports.addStudent=addStudent;
module.exports.retrieveAll=retrieveAll;
module.exports.updateOne=updateOne;
module.exports.deleteOne=deleteOne;