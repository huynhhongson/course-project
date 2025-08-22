const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;


const CourseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String,},
    image: { type: String,},
    videoId: { type: String, required: true },
    level: { type: String,},
    slug: {type: String, slug: 'name', unique: true},
},{
    timestamps: true
});

//Add plugins
mongoose.plugin(slug)
CourseSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all',
})

//Custom query heplers
CourseSchema.query.sortable = function(req){
    if(Object.prototype.hasOwnProperty.call(req.query, '_sort')){
            const isValidType = ['asc', 'desc'].includes(req.query.type)
            return this.sort({
                [req.query.column]: isValidType ? req.query.type : 'desc'
            })
        }

    return this
} 

module.exports = mongoose.model('Course', CourseSchema);
