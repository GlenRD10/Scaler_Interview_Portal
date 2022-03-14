const express = require('express')
const {getAllParticipants, getParticipant, createParticipant} = require("../controllers/participants")

const router=express.Router()

router.route("/").get(getAllParticipants).post(createParticipant)
router.route("/:id").get(getParticipant)

module.exports = router