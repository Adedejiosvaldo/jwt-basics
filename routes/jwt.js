const express = require("express");
const { login, dashBoard } = require("../controller/main");
const router = express.Router();

router.route("/login").get().post(login);
router.route("/dashboard").get(dashBoard);
module.exports = router;
