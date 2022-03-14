const Interviewer = require('../models/Interviewer')

const getAllInterviewers = async (req, res) => {
    try {
        const interviewer = await Interviewer.find({})
        res.status(200).json({interviewer})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const getInterviewer = async (req, res) => {
    try {
        const interview = await Interviewer.findOne({_id: req.params.id})
        res.status(200).json({interviewer})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const createInterviewer = async (req, res) => {
    try {
        const interviewer =  await Interviewer.create(req.body)
        res.status(201).json({interviewer})   
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = {getAllInterviewers, getInterviewer, createInterviewer}