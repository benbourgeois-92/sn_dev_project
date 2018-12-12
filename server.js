const express = require('express');
const mongoose = require('mongoose');

//in order to use req.body and add bodyParser to the server
const bodyParser = require('body-parser');
const passport = require('passport');


const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const app = express();

//body parser middleware to use req.body- bodyParser returns 
//a function that acts as middleware. The function listens for 
//req.on(‘data’) and constructs req.body from the chunks of data 
//it gets.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());

//Passport config
require('./config/passport.js')(passport);


//DB config
const db = require('./config/keys.js').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db)
    .then(() => { console.log('MongoDB connected') })
    .catch((err) => { console.log(err) });


app.get('/', (req, res) => {

    res.send('Hello world');
});


//User routes
app.use('/api/users', users);
app.use('/api/profile', profiles);
app.use('/api/posts', posts);

//process.env.PORT sets port automatically on Heroku or 5000 on local machine
const port = process.env.PORT || 5000;


app.listen(port, () => {

    console.log(`Server running on port ${port}`);
});