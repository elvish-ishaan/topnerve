import mongoose from "mongoose";

const reviewModel = new mongoose.Schema({
    rating: {
        type: Number,
    },
    comment:{
        type: String
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

export const Review = mongoose.model('Review', reviewModel);