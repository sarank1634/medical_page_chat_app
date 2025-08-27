const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
    res.send('signup');
});

module.exports = router;


router.post('/login', (req, res) => {
    res.send('login');
});