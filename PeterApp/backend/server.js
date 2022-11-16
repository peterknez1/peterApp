//server.js


var express = require('express');
var bodyParser = require('body-parser')

const dotenv = require('dotenv');

dotenv.config();



const mongoose = require("mongoose");

const  User = require('./models/User');


const mongoString = process.env.ATLAS_URI;

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


var new_user = new User({username: "PeterKnez", password: "xxCaracalla42xx"});
new_user.save(function(err, result) {
    if(err) {
        console.log(err);
    }
    else {
        console.log(result);
    }
})
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/', function(req, res) {
    res.send('Hello World');
})

var users = require('./routes/users');

app.use('/api', users);

var server = app.listen(8080, function() {
    console.log("Backend Application listening at http://localhost:8080")
})