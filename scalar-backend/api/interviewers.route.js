const express = require('express')
const {getAllInterviewers, getInterviewer, createInterviewer} = require("../controllers/interviewers")

const router=express.Router()

router.route("/").get(getAllInterviewers).post(createInterviewer)
router.route("/:id").get(getInterviewer)

module.exports = router