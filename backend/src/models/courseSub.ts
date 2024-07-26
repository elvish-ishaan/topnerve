import mongoose from 'mongoose'

const courseSubModel = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    chapterNames: [{
        type: mongoose.Types.ObjectId,
        ref: 'CourseChap'
    }]

})

export const CourseSub = mongoose.model('CourseSub', courseSubModel)