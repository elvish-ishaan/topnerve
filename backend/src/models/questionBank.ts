import mongoose from "mongoose";

const questionBankModel = new mongoose.Schema({
    questions: [
        {
            question: {
                type: String,
                require: true
            },
            options:[{type:String, required: true, trim: true}],
            answer:{
                type: String,
                require: true
            },
            explaination: {
                type: String,
                default: null
            }
        }
    ]
})

export const QuestionBank = mongoose.model('QuestionBank', questionBankModel)