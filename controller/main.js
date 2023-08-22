const login = async (req, res) => {
  res.send("Fake Login Route /Signup");
};
const dashBoard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res
    .status(200)
    .json({
      msg: `Hello Joseph`,
      secret: `Here is your secret token ${luckyNumber}`,
    });
};

module.exports = { dashBoard, login };
