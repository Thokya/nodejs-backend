const mongoose = require("mongoose");

const uri = process.env.NODE_ENV === "dev"
    ? process.env.DEV_URI
    : process.env.LIVE_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.LIVE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    } catch (err) {
        console.log("Db conn: ", err.message);
    }
};

module.exports = connectDB;
