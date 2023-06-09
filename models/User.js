const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_id: { type: Number, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role_id: { type: Number, default: 2 },
});

module.exports = mongoose.model("User", userSchema);
