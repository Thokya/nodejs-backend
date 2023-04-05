const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    post_message: {
        type: String,
        required: true,
    },
    previous_message: [
        {
            message: String,
            timestamp: { type: Date, default: Date.now },
        },
    ],
    is_active: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("Post", postSchema);
