const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
//used for password encryption
const bcrypt = require('bcryptjs');


//require User schema object
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




module.exports = router;