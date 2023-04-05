const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const postSchema = new mongoose.Schema({
    user_id: {
        user: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    post_message: { type: String, required: true },
    previous_message: [{ message: String, timestamp: Date }],
    is_active: { type: Boolean, default: true },
}, {
    timestamps: true,
});

postSchema.plugin(AutoIncrement, {
    inc_field: "post",
    id: "postNums",
    start_seq: 1,
});

module.exports = mongoose.model("Post", postSchema);
