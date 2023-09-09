const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const authMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No Token Provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRETS);
    const { id, username } = decode;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError("Not authorized to access route - auth", 401);
  }
};
module.exports = authMiddleWare;
