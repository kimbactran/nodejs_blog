const newsRouter = require('./news.routes');
const siteRouter = require('./site.routes');
const courseRouter = require('./courses.routes');

function route(app) {
    app.use('/courses', courseRouter)
    app.use('/news', newsRouter);
    app.use('/search', siteRouter);
    app.use('/', siteRouter);
}

module.exports = route;
