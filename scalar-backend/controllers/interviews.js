const Interview = require('../models/Interview')

const getAllInterviews = async (req, res) => {
    try {
        const interview = await Interview.find({})
        res.status(200).json({interview})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const getInterview = async (req, res) => {
    try {
        const interview = await Interview.findOne({_id: req.params.id})
        res.status(200).json({interview})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const createInterview = async (req, res) => {
    const comEle = (a1, a2) => {
        return a1.some(a => a2.includes(a));
    }
    const { startTime, endTime, interviewers, participants } = req.body;
    try {
        if (participants < 2) return res.status(400).json({msg: 'Less than two participants selected'});
        const commonInterviews = await Interview.find({
            $and: [
                {endTime: {$gte: startTime}},
                {startTime: {$lte: endTime}},
            ]
        });
        commonInterviews.forEach((ci) => {
            if (comEle(interviewers, ci.interviewers) || comEle(participants, ci.participants))
                return res.status(400).json({msg: 'Participants preoccupied with other interviews'});
        })
        const interview =  await Interview.create(req.body)
        return res.status(201).json({interview})   
    } catch (error) {
        return res.status(500).json({msg: error})
    }
}

const updateInterview = async (req, res) => {
    try {
        console.log(req.params.id);
        const interview = await Interview.findByIdAndUpdate(req.params.id, { ...req.body });
        return res.status(201).json({interview});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
    }
}

const deleteInterview = (req, res) => {
    res.send('delete interview')
}

module.exports = {
    getAllInterviews,
    getInterview,
    createInterview,
    updateInterview,
    deleteInterview
}