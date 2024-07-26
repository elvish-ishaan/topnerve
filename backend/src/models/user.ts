import mongoose from "mongoose";
import { number } from "zod";

//defining model
const userModel = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    purchasedCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }],
    tests: [{
        type: mongoose.Types.ObjectId,
        ref: 'Test'
    }],
    totalQuestionsDone: {
        type: Number,
    },
    token: {
        type: String,
        default: null,
    },
    additionalDetails: {
        type: mongoose.Types.ObjectId,
        ref: 'AdditionalDetails',
    }
    
})


export const User = mongoose.model('User',userModel);