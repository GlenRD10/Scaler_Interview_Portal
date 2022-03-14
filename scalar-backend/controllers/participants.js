const Participant = require('../models/Participant')

const getAllParticipants = async (req, res) => {
    try {
        const participant = await Participant.find({})
        res.status(200).json({participant})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const getParticipant = async (req, res) => {
    try {
        const participant = await Participant.findOne({_id: req.params.id})
        res.status(200).json({participant})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const createParticipant = async (req, res) => {
    try {
        const participant =  await Participant.create(req.body)
        res.status(201).json({participant})   
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = {getAllParticipants, getParticipant, createParticipant}