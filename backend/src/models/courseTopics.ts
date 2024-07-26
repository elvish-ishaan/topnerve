import mongoose from "mongoose";

const courseTopicModel = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    discription: {
        type: String,
        require: true
    },
    level: {
        type: String,
        require: true
    },
    questionBank: [{
        type: mongoose.Types.ObjectId,
         require: true,
         ref: 'QuestionBank'
        }]
})

export const CourseTopic = mongoose.model("CourseTopic", courseTopicModel)