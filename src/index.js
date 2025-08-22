const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const route = require('./routes');
const db  = require('./config/db')
const sortMiddleware = require('./app/middlewares/sortMiddleware')
const helpers = require('./helpers/handlebars')

//Connect to DB
db.connect()

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded());
app.use(express.json());

app.use(methodOverride('_method'))

//Custom middlewares
app.use(sortMiddleware)

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: helpers
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
