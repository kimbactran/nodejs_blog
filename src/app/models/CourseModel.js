const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-updater');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;



const Course = new Schema({
  name: { type: String, maxLength: 255, required: true},
  description: { type: String, maxLength: 600},
  image: { type: String , maxLength: 255},
  slug: { type: String, slug: "name", unique: true },
  videoId: { type: String , maxLength: 255, required: true},
  deletedAt: { type: Date},
  
  
}, {
  timestamps: true,
});

// Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete,  { overrideMethods: 'all' });
module.exports = mongoose.model('Course', Course);
