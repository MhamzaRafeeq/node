const mongoose = require("mongoose")
const { Schema } = mongoose

const schema = new Schema({
    user_id: { type: String, unique: true, required: true },
    fullName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ["customer"] },
    status: { type: String, default: "active" },
    emailVerified: { type: Boolean, default: false },
}, { timestamps: true })

const auth = mongoose.model("users", schema)
module.exports = auth