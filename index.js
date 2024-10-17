const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv")
// this is edited file

const auth = require("./routes/auth")

mongoose.connect("mongodb+srv://ahsanmushtaq072:P5Fu6oiEiol4BkPl@cluster0.8zvyz.mongodb.net/", { dbName: "hamza" })
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