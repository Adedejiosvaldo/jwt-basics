const express = require("express");
const { login, dashBoard } = require("../controller/main");
const authMiddleWare = require("../middleware/auth");
const router = express.Router();

router.route("/login").post(login);
router.route("/dashboard").get(authMiddleWare, dashBoard);
module.exports = router;
