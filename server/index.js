const express = require('express')
const passport = require('../passport/passport.js')
const app = express()
const port = 3000
//to access form data
const bodyParser = require('body-parser');
//Accessing the routes for the user
const userRoutes = require('../routes/routeUser');

const redisRoutes = require('../routes/routeRedis');
app.use(redisRoutes);

var mongoose = require('mongoose');

const http404 = require('../middleware/route404');

//used to fetch the data from forms on HTTP POST, and PUT
app.use(bodyParser.urlencoded({
    extended : true
  }));
  
app.use(bodyParser.json());
  
//Acces the routes 
app.use(userRoutes);
app.use(http404.notFound); 

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

var connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test';
mongoose.connect(connStr, function (err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});
