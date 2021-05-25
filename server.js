require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const router = require('./server/router/router');
const port = process.env.PORT || 3000;
const hbs = require('express-handlebars');
const connect = require('./server/database/database');
connect();


app.use(express.json());
// serving static path
app.use(express.static(path.join(__dirname, 'public')));

// set view engine
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials')
}));

// routes
app.use('/', router);

// listening
app.listen(port, () => console.log(`listening on http://localhost:${port}`))