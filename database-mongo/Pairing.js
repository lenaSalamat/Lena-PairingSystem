var mongoose = require("mongoose")


var pairsSchema = mongoose.Schema({
 student1: String,
 student2: String
});

var Pairs = mongoose.model('Pairs', pairsSchema);


let addPairs = function (req, res) {
    var student1 = req.body.student1
    var student2 = req.body.student2
    
    var newPairs = new Pairs({
        student1: student1,
        student2: student2
    })
    console.log(newPairs)

    newPairs.save(function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
        }
    })
}


let retrieveAllPai = function (req, res) {
    Pairs.find({}, function (err, data) {
        if (err) {
            console.log(err)
        }
        if (data.length === 0) {
            return res.sendStatus(404)
        }
        res.json(data)
    })
}

module.exports = Pairs
module.exports.pairsSchema = pairsSchema
module.exports.addPairs=addPairs;
module.exports.retrieveAllPai=retrieveAllPai;





