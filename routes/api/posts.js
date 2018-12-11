const express = require('express');
const router = express.Router();


// GET api/posts/test - @desc tests post route public
router.get('/test', (req, res) => {res.json({msg: "posts works"})});

module.exports = router;