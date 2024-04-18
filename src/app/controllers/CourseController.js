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

    //[POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIds}})
        .then(() => res.redirect('back'))
        .catch(next);  
                break;
            case 'restore':
                Course.restore({_id: {$in: req.body.courseIds}})
        .then(() => res.redirect('back'))
        .catch(next);  
                break;
            case 'forceDelete':
                Course.deleteOne({_id: {$in: req.body.courseIds}})
        .then(() => res.redirect('back'))
        .catch(next);  
                break;
            default:
                res.json({message: 'Action invalid'});
        }
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

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }

     // [DELETE] /courses/:id
     forceDelete(req, res, next) {
        Course.deleteOne({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }


}

module.exports = new CourseController();
