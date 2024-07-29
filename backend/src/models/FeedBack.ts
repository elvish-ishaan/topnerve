import mongoose from 'mongoose';

const feedBackSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true
    },
    message: {
        type: String
    }
})

export const FeedBack = mongoose.model('FeedBack', feedBackSchema)