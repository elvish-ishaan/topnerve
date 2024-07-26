import mongoose, { mongo } from "mongoose";
import { string } from "zod";

const talkExpertSchema = new mongoose.Schema({
    name: {
        type: String,
        reqire: true
    },
    mobile: {
        type: Number,
        require: true
    }
})

export const TalkExpert = mongoose.model("TalkExpert", talkExpertSchema)