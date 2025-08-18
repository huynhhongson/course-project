const newsRouter = require('../routes/news');
const siteRouter = require('../routes/site');
const coursesRouter = require('../routes/courses');

function route(app) {
    app.use('/news', newsRouter);

    app.use('/', siteRouter);

    app.use('/courses', coursesRouter);
}

module.exports = route;
