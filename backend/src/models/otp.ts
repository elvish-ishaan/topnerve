import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp: {
        require: true,
        type: Number,
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
})

export  const Otp = mongoose.model('Otp', otpSchema)