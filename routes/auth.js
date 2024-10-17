const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Users = require("../models/auth")
const verifyToken = require("../middlewares/auth")

const router = express.Router()

const getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)

router.post("/register", async (req, res) => {

    const { fullName, email, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const userData = { user_id: getRandomId(), fullName, email, password: hashedPassword, }

        const user = await Users(userData)
        user.save()

        res.status(201).json({ message: "User created successfully", user })
    } catch (error) {
        res.status(500).json({ error })
    }
})
router.post("/login", async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await Users.findOne({ email })
        if (!user) { return res.status(404).json({ message: "User not found" }) }

        const match = await bcrypt.compare(password, user.password)


        if (match) {

            const { user_id } = user

            const token = jwt.sign({ user_id }, "secret-key", { expiresIn: "30s" })

            res.status(200).json({ message: "User loggedin successfully", token })
        } else {
            return res.status(404).json({ message: "Password is incorrect" })
        }


    } catch (error) {
        console.error(error)
        res.status(500).json({ error })
    }
})
router.get("/user", verifyToken, async (req, res) => {

    const user_id = req.user_id

    try {

        const user = await Users.findOne({ user_id })
        if (!user) { return res.status(404).json({ message: "User not found" }) }

        res.status(200).json({ user })


    } catch (error) {
        console.error(error)
        res.status(500).json({ error })
    }
})

module.exports = router