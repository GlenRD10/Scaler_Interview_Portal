const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Must provide Date'],
    }, 
    startTime: {
        type: Date,
        required: [true, 'Must provide start time'],
    },
    endTime: {
        type: Date,
        required: [true, 'Must provide end time'],
    },
    interviewers: [
        {
            name: {
                type: String,
                required: [true, 'Must provide Name'],
                trim: true
            },
            email: {
                type: String,
                required: [true, 'Must provide Email'],
            },
        },
    ],
    participants: [
        {
            name: {
                type: String,
                required: [true, 'Must provide Name'],
            },
            email: {
                type: String,
                required: [true, 'Must provide Email'],
            },
        },
    ],
})

module.exports = mongoose.model('Interview', InterviewSchema)