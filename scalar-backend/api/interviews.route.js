const express = require('express')
const {getAllInterviews, getInterview, createInterview, updateInterview, deleteInterview} = require("../controllers/interviews")

const router=express.Router()

router.route("/").get(getAllInterviews).post(createInterview)
router.route("/:id").get(getInterview).patch(updateInterview).delete(deleteInterview)

module.exports = router