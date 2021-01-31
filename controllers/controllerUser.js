const redis = require("redis");
const client = redis.createClient();

function createUser(req, res) {
    let User = require('../models/modelUser');
    let newUser = User ({
        nom: req.body.nom,
        prenom : req.body.prenom,
        email : req.body.email,
        mdp : req.body.mdp
    });
  
    newUser.save()
    .then((savedUser) => {

        //send back the created User
        res.json(savedUser);
            
    }, (err) => {
        res.status(400).json(err)
    });
}
function readUsers(req, res) {

    let User = require("../models/modelUser");

    User.find({})
    .then((users) => {
        res.status(200).json(users);
    }, (err) => {
        res.status(500).json(err);
    });
 }

 function readUser(req, res) {

    let User = require("../models/modelUser");

    User.findById({_id : req.params.id})
    .then((user) => {
        res.status(200).json(user);
    }, (err) => {
        res.status(500).json(err);
    });
 }

 function updateUser(req, res){

    let User = require("../models/modelUser");

    User.findByIdAndUpdate({_id: req.params.id}, 
        {nom : req.body.nom, 
        prenom : req.body.prenom,
        email : req.body.email},
        {new : true})
    .then((updatedUser) => {
        res.status(200).json(updatedUser);
    }, (err) => {
        res.status(500).json(err);
    });
 }

 function deleteUser(req, res){

    let User = require("../models/modelUser");

    User.findOneAndRemove({_id : req.params.id})
    .then((deletedUser) => {
        res.status(200).json(deletedUser);
    }, (err) => {
        res.status(500).json(err);
    });
 }

module.exports.read = readUser;
module.exports.reads = readUsers;
module.exports.create = createUser;
module.exports.update = updateUser;
module.exports.delete = deleteUser;