const express = require('express');
const app = express();
const morgan = require('morgan');
const html = require('html-template-tag');
const main = require('./views/main.js');
const { db, Page } = require('./models');

db.authenticate().
then(() => {
  console.log('connected to the database');
});

app.use(express.json());    //parse post requests with json body
app.use(express.urlencoded({ extended: false }));   //parse post requests with urlencoded bodies
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', async (req, res, next) => {
    try {
        const allPages = await Page.findAll();
        const content = allPages.map((page) => html`
        <li>
            <a href="wiki/${page.slug}">${page.title}</a>
        </li>`);
        res.send(main(content));
    } catch (error) {
        next(error);
    }
});

app.use('/users', require('./routes/user'));
app.use('/wiki', require('./routes/wiki'));

async function init() {
    await db.sync(
        // {force: true}
    );
    app.listen('3000', () => {
        console.log('Listening');
    });
}

init();
