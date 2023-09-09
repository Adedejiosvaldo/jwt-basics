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
  console.log(token);

  res.status(200).json({ msg: "User Created!", token });
};

const dashBoard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No Token Provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRETS);
    console.log(decode);
    res.status(200).json({
      msg: `Hello ${decode.username}`,
      secret: `Here is your secret token ${token}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not authorized to access route", 401);
  }
};

module.exports = { dashBoard, login };
