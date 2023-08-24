const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
// validation Types
// 1. Mongoose
// 2. JOi
// 3. controller
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    // res.send("You have to input a username and username");
    throw new CustomAPIError("Please Provide Email and Password", 400);
  }
  console.log(username, password);

  const id = new Date().getMilliseconds;
  console.log(username, password);
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(username, password);
  res.status(200).json({ msg: "Fake Login Route /Signup", token });
};
const dashBoard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello Joseph`,
    secret: `Here is your secret token ${luckyNumber}`,
  });
};

module.exports = { dashBoard, login };
