const express = require('express');
const router = express.Router();

//will run at /users/test due to api/users/ already in server.js
router.get('/test', (req, res) => { res.json({msg: "Users Works"})});

module.exports = router;