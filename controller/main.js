const { BadRequest, UnAuthenticatedError } = require("../errors");

const jwt = require("jsonwebtoken");

// validation Types
// 1. Mongoose
// 2. JOi
// 3. controller
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("Please Provide Email and Password");
  }
  const id = new Date().getMilliseconds();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRETS, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User Created!", token });
};

const dashBoard = async (req, res) => {
  try {
    const secureDate = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${req.user.username}`,
      secret: `Here is your personalized data  ${secureDate}`,
    });
  } catch (error) {
    throw new UnAuthenticatedError("Not authorized to access route");
  }
};

module.exports = { dashBoard, login };
