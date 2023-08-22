const express = require("express");
const { login, dashBoard } = require("../controller/main");
const router = express.Router();

router.route("/login").get(login);
router.route("/dashboard").get(dashBoard);
module.exports = router;