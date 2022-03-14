const mongoose = require('mongoose')

const ParticipantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    interviews: [
        {
            startTime: {
                type: Date,
                required: true
            },
            endTime: {
                type: Date,
                required: true
            },
        }
    ]
})

module.exports = mongoose.model('Participant', ParticipantSchema)