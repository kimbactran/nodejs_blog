const Course = require('../models/CourseModel');
const { multiplesMongooseToObject } = require('../../utils//mongoose')
class SiteController {
    // [GET] /Site
    async index(req, res, next) {

       await Course.find({}).then(courses => {
        
        res.render('home', {
        
            courses: multiplesMongooseToObject(courses),
           });
       }).catch(next);

       const course = {
        name: 'JS'
       };
        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
