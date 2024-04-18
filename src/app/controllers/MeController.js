const Course = require('../models/CourseModel');
const { multiplesMongooseToObject, mongooseToObject } = require('../../utils//mongoose');


class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        // Promise
        Promise.all([Course.countDocumentsWithDeleted({deleted: true}),  Course.find({})])
        .then(([deletedCount, courses]) => res.render('me/stored-courses', {
            deletedCount,
            courses: multiplesMongooseToObject(courses),
        } )).catch(next);

        
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
