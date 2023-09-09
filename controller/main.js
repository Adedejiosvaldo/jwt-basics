const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

// validation Types
// 1. Mongoose
// 2. JOi
// 3. controller

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("Please Provide Email and Password", 400);
  }
  const id = new Date().getMilliseconds();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRETS, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User Created!", token });
};

const dashBoard = async (req, res) => {
  console.log("dashbpard", req.user);
  try {
    const secureDate = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${req.user.username}`,
      secret: `Here is your personalized data  ${secureDate}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not authorized to access route", 401);
  }
};

module.exports = { dashBoard, login };
