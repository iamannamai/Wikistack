const express = require('express');
const router = express.Router();
const html = require('../views/addPage.js');

router.get('/', (req, res) => {
    res.redirect('/');
    //res.send('');
});

router.post('/', (req, res) => {
    res.json(req.body);
});

router.get('/add', (req, res) => {
    res.send(html());
});


module.exports = router;
