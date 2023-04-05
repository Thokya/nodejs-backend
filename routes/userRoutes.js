const express = require("express");

const usersController = require("../controllers/usersController");

const router = express.Router();

router.route("/")
    .get(usersController.getUser)
    .post(usersController.createNewUser)

module.exports = router;
