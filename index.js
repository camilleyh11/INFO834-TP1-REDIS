const express = require('express')
const http404 = require('./middleware/route404');
const app = express()
const port = 3000

//to access form data
let bodyParser = require('body-parser');

var mongoose = require('mongoose'),
    User = require('./models/modelUser.js');

//used to fetch the data from forms on HTTP POST, and PUT
app.use(bodyParser.urlencoded({

    extended : true
  
  }));
  
app.use(bodyParser.json());

app.get('/createUser', (req, res) => {
    // create a user a new user
    var testUser = new User({
        nom: 'krusi',
        prenom: 'camille',
        email: 'ck@gmail.com',
        mdp: 'mdp'
    });

    // save user to database
    testUser.save(function (err) {
        if (err) throw err;
    });

    res.send('OK')
})

app.get('/testMdp', (req, res) => {
    // fetch user and test password verification
    User.findOne({ email: 'ck@gmail.com' }, function (err, user) {
        if (err) throw err;

        // test a matching password
        user.comparePassword('mdp', function (err, isMatch) {
            if (err) throw err;
            console.log('mdp:', isMatch); 
        });

        // test a failing password
        user.comparePassword('mdp', function (err, isMatch) {
            if (err) throw err;
            console.log('mdp:', isMatch); 
        });
    });

    res.send('OK OK')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Accessing the routes for the user
const todoRoutes = require('./routes/routeUser');

//Acces the routes 
app.use(todoRoutes);

//When there is no route that caught the incoming request
//use the 404 middleware
app.use(http404.notFound);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

var connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test';
mongoose.connect(connStr, function (err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});