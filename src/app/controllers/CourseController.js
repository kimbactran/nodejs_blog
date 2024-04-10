const Course = require('../models/CourseModel');
const { multiplesMongooseToObject, mongooseToObject } = require('../../utils//mongoose')
class CourseController {
    // [GET] /Course/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
        .then(course => {
            res.render('courses/show', {course: mongooseToObject(course)});
        })
        .catch(next);
    }
}

module.exports = new CourseController();
