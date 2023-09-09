const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const { UnAuthenticatedError } = require("../errors");
const authMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("No Token Provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRETS);
    const { id, username } = decode;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Not authorized to access route");
  }
};
module.exports = authMiddleWare;
