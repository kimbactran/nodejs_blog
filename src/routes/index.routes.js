const newsRouter = require('./news.routes');
const meRouter = require('./me.routes');
const siteRouter = require('./site.routes');
const courseRouter = require('./courses.routes');

function route(app) {
    app.use('/courses', courseRouter)
    app.use('/me', meRouter)
    app.use('/news', newsRouter);
    app.use('/search', siteRouter);
    app.use('/', siteRouter);
}

module.exports = route;
