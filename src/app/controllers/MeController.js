const Course = require('../models/CourseModel');
const { multiplesMongooseToObject, mongooseToObject } = require('../../utils//mongoose');


class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
        .then(courses => res.render('me/stored-courses', {
            courses: multiplesMongooseToObject(courses  )
        }))
        .catch(next);
    }

    trashCourses(req, res, next){
        Course.findWithDeleted({deleted: true})
        .then(courses => res.render('me/trash-courses', {
            courses: multiplesMongooseToObject(courses  )
        }))
        .catch(next);
    }
}

module.exports = new MeController();
