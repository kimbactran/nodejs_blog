const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const app = express();
const port = 8080;
const methodOverride = require('method-override');


const route = require('./routes/index.routes');
const db = require('./config/db');

// Connect to DB
app.use(methodOverride('_method'));
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {sum: (a, b) => (a + b)}
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

//127.0.0.1 - localhost
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
