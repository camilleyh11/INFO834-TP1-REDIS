//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/controllerUser');

const User = require('../models/modelUser.js');
const JWT_SECRET = require('../secrets/secret');
const Jwt = require('jsonwebtoken');
const passport = require('passport');


//CREATE
router.post("/user", (req, res) => {   
    controller.create(req, res);
});

//READ
router.get("/users", (req, res) => {  
    controller.reads(req, res);  
});

router.get("/user/:id", (req, res) => {
    controller.read(req, res);
});

//UPDATE
router.put("/user/:id", (req, res) => {
    controller.update(req, res);
});

//DELETE
router.delete("/user/:id", (req, res) => {   
    controller.delete(req, res);
});


//Test création d'un utilisateur 
router.get('/createUser', async (req, res) => {
    // create a user a new user
    var testUser = new User({
        nom: 'krusi',
        prenom: 'camille',
        email: 'ck@gmail.com',
        mdp: 'mdp123'
    });
  try {
      // save user to database
      await testUser.save() 
      res.send('Nouvel utilisateur')
    
  } catch (error) {
    res.send('Nom d utilisateur deja existant')
    console.error(error);
  }
  
  })

  //Test mdp
  router.get('/testmdp', (req, res) => {
    // fetch user and test password verification
    User.findOne({ email: 'ck@gmail.com' }, function (err, user) {
        if (err) throw err;
  
        // test a matching password
        user.comparePassword('mdp', function (err, isMatch) {
            if (err) throw err;
            console.log('mdp:', isMatch);
        });
  
        // test a failing password
        user.comparePassword('mdp123', function (err, isMatch) {
            if (err) throw err;
            console.log('mdp123:', isMatch);
        });
    });
  
    res.send('mdp fonctionne')
  })

  //LOGIN
router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) throw err;
  
        // test a matching password
        user.comparePassword(req.body.mdp, function (err, isMatch) {
            if (err) throw err;
        
            if(req.body.mdp , isMatch){
                
                const token = Jwt.sign({id: user._id, mdp: user.msp, email: user.email},
                '123456',
                {expiresIn:'1 week'})

                res.send(token)
            } else {
                res.send("mot de passe ou email incorrect")
            }
        });


    });
});
router.get('/', passport.authenticate('jwt'), function (req, res){
    res.json(req.user)
});

  router.get('*', function(req, res){
    res.send('ERREUR 404', 404);
  });


module.exports = router;