const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout');
const { db, Page, User } = require('./models');
const user = require('./Routes/user.js');
const wiki = require('./Routes/wiki.js');

db.authenticate().
then(() => {
  console.log('connected to the database');
});

app.use(express.json());    //parse post requests with json body
app.use(express.urlencoded({ extended: false }));   //parse post requests with urlencoded bodies
app.use(morgan('dev'));
app.use(express.static('Public'));

app.get('/', (req, res) => {
    res.send(layout(''));
    //res.redirect('/wiki');
});

app.use('/user', user);
app.use('/wiki', wiki);

async function init() {
    await db.sync();
    app.listen('3000', () => {
        console.log('Listening');
    })
}

init();
