import mongoose from "mongoose";

const courseChapModel = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    topics: [{
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'CourseTopic'
    }]
})

export const CourseChap = mongoose.model('CourseChap', courseChapModel)