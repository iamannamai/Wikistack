const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout');

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('Public'));

app.get('/', (req, res) => {
    res.send(layout(''));
});

app.listen('3000', () => {
    console.log('Listening');
})
