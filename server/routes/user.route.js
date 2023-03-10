const express = require("express");
const { route } = require("../app");
const { createUser, loginUser, logout, forgotPassword, getUserDetails } = require("../controller/user.controller");

const router = express.Router();

router.route('/user').post(createUser);

router.route('/login').post(loginUser);

router.route('/logout').get(logout);

router.route('/password/forgot').post(forgotPassword);

router.route('/me').get(getUserDetails);
module.exports = router;