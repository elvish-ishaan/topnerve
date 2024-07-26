import mongoose from "mongoose";

const courseModel = new mongoose.Schema({
    thumbnail: {
        type: String,
    },
    title: {
        type: String,
        require: true
    },
    discripton: {
        type: String,
        require: true
    },
    courseSubjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseSub'
    }],
    tags: [{
        type: String,
         require: true
        }],
    price: {
        type: Number,
        require: true
    },
    enrolledUsers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    // ratings: [{
    //     types: mongoose.Types.ObjectId,
    //     ref: 'Review'
    // }],
    status: {
        type: String,
        enum:['Public','Private','Unsaved'],
        default: 'Unsaved'
    }
})

export const Course = mongoose.model('Course', courseModel)