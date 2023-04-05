const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/User");

// @desc get user
// @route get /user:_id
// @access private
const getUser = asyncHandler(async (req, res) => {
    const userId = req.params._id;
    const ObjectId = mongoose.Types.ObjectId;
    const id = new ObjectId();

    try {
        const user = await User.aggregate([
            { $match: { _id: id.toString(userId) } },
            {
                $lookup: {
                    from: "roles",
                    localField: "role_id",
                    foreignField: "role_id",
                    as: "role",
                },
            },
            { $unwind: "$role" },
            { $project: { password: 0 } },
        ]);

        if (!user || user.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", err: error.message });
    }
});

// @desc create new user
// @route POST /user
// @access private
const createNewUser = asyncHandler(async (req, res) => {
    const { name, email, password, role_id = 2 } = req.body;

    if (!name || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email }).lean().exec();

    if (userExists) {
        return res.status(409).json({ error: "User already exists" });
    }

    const hashPwd = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashPwd,
        role_id,
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({
            message: "Error creating user",
            error: error.message,
        });
    }
});

module.exports = {
    getUser,
    createNewUser,
};
