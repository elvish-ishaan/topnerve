import mongoose from 'mongoose'

const scheduleSchema = new mongoose.Schema({
    title: String,
    createdAT: {
        type: Number,
        default: Date.now()
    },
    status: {
        type: String,
        default:'pending',
        enum: ['done', 'pending']
    }
});

export const Schedule = mongoose.model('Schedule', scheduleSchema)