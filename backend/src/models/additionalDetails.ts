import mongoose from "mongoose";

const additionalDetailsModel = new mongoose.Schema({
    profile: String,
    firstName: String,
    LastName: String,           //changel l fix 
    bio: String,
    Mobile: Number,
    snapId: String,
    instaId: String,
    facebookId: String,
    totalScore: Number,
    meanScore: Number,
    achievements: [ {
        name: String,
        link: String
    } ],
})

export const AdditionalDetails = mongoose.model('AdditionalDetails', additionalDetailsModel)