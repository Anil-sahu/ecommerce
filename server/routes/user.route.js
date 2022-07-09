const express = require("express");
const { route } = require("../app");
const { createUser, loginUser } = require("../controller/user.controller");

const router = express.Router();

router.route('/user').post(createUser);
router.route('/login').post(loginUser);


module.exports = router;