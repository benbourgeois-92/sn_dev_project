const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
//used for password encryption
const bcrypt = require('bcryptjs');
//JSON WEB TOKEN for authentication
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys.js');


//require User schema/collection object
const User = require('../../models/User.js');

//will run at /users/test due to api/users/ already in server.js
router.get('/test', (req, res) => { res.json({msg: "Users Works"})});

//registering user
router.post('/register', (req, res) => {
    //checking if there is a user object already matching the one sent
    User.findOne({ email: req.body.email }).then(user => {
            if(user) {
                return res.status(400).json({email: 'Email is already in our system.'});
            }else {

                const avatar = gravatar.url(req.body.email, {
                    s: '200', //Size
                    r: 'pg', //Appropriateness rating
                    d: 'mm' //sets default image to appear if none found
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));

                    });

                });
            }
        })

});


//@route GET api/users/login
//@desc Login user / returning Token
//@access Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({email: email})
        .then(user => {
            if(!user) {
                return res.status(404).json({email: 'User not found.'});
            }
            //check password

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        //res.json({msg: 'Success'});

                        // payload is data inside json web token
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }

                        //Sign token

                        jwt.sign(payload, 
                                keys.secretOrKey, 
                                {expiresIn: 3600}, 
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    });
                        });
                        



                    } else {
                        return res.status(400).json({password: 'Password Incorrect.'});
                    }
                });




        });

});
//@route GET api/users/current
//@desc Return current user
//@access Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });

});




module.exports = router;