const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./database/connect')

dotenv.config();

const interviews = require("./api/interviews.route")
const interviewers = require("./api/interviewers.route")
const participants = require("./api/participants.route")

const app = express()

const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors({
  origin: '*'
}));


app.use("/api/v1/interview", interviews)
app.use("/api/v1/interviewers", interviewers)
app.use("/api/v1/participants", participants)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

const start = async () => {
  try {
    await connectDB(process.env.INTERVIEWS_DB_URI)
    app.listen(port, () => {
      console.log(`Listening on PORT ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

module.exports = app