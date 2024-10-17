const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config();


const auth = require("./routes/auth")

mongoose.connect(process.env.CONNECTION_STRING, { dbName: "hamza" })
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((error) => {
        console.log("MongoDB not connected")
        console.error(error)
    })

const app = express();
app.use(bodyParser.json())
app.use(cors())

const { PORT = 8000 } = process.env
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})

app.use("/auth", auth)