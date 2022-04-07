const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const User = require("../dataBase/models/User.model.");
const Token = require("../dataBase/models/Token.model.");
const { asyncHandler } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.post("/registration", asyncHandler(createUser));
  router.post("/login", asyncHandler(loginUser));
}

async function createUser(req, res, next) {
  const user = await User.findOne({ where: { email: req.body.email } });

  if (user) {
    throw new ErrorResponse("This email already exists", 400);
  }

    await User.create({
    login: req.body.login,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
  });
  res.status(200).json({ message: "OK" });
}

async function loginUser(req, res, next) {
  const user = await User.findOne({
    where: { email: req.body.email, password: req.body.password },
  });

  if (!user) {
    throw new ErrorResponse("Wrong email or password", 403);
  }

  const token = await Token.create({
    value: rand() + rand(),
    userId: user.id,
  });
  res.status(200).json({ accessToken: token.value });
}

const rand = function () {
  return Math.random().toString(36).substr(2);
};

initRoutes();

module.exports = router;
