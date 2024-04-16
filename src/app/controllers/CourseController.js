const Course = require('../models/CourseModel');
const { multiplesMongooseToObject, mongooseToObject } = require('../../utils//mongoose');
const { response } = require('express');

class CourseController {
    // [GET] /Course/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
        .then(course => {
            res.render('courses/show', {course: mongooseToObject(course)});
        })
        .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = 'https://i.ytimg.com/an_webp/M0OwOYPFkrM/mqdefault_6s.webp?du=3000&sqp=CJmd4LAG&rs=AOn4CLCs-XtdZSqcU4JGszYgglxbZZceWg';
        const course = new Course(formData);
        course.save();
        res.send("SUCCESS!!!!");
    }

    //[GET] /courses/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
        .then(course => res.render('courses/edit', {
            course: mongooseToObject(course)
        })).catch(next)
        ;
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);
    }


}

module.exports = new CourseController();
