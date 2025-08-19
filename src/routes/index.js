const newsRouter = require('../routes/news');
const siteRouter = require('../routes/site');
const meRouter = require('../routes/me');
const coursesRouter = require('../routes/courses');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;
