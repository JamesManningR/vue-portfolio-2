const webToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const HttpError = require("../models/http-error");

function generateToken(userdata) {
  let token;
  try {
    token = webToken.sign(
      { userId: userdata.id, name: userdata.name },
      process.env.SECRET_KEY,
      { expiresIn: "30m" }
    );
  } catch (err) {
    const error = new HttpError("Signup failed, please try again", 500);
    return error;
  }
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 30);
  const expiry = expiryDate.getTime();
  return { token, expiry };
}

const createUser = async (req, res, next) => {
  const { username, password } = req.body;
  const role = "guest";

  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    const error = new HttpError("Sign up failed, please try again later", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User with this name already exists", 422);
    return next(error);
  }

  let hashedPass;
  try {
    hashedPass = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Creating user failed, please try again", 500);
    return next(error);
  }

  const createdUser = new User({
    username,
    password: hashedPass,
    role,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signup failed, please try again", 500);
    return next(error);
  }

  const authToken = generateToken(createdUser);

  res.status(201).json({
    userId: createdUser.id,
    username: createdUser.username,
    userRole: createdUser.role,
    token: authToken.token,
    tokenExpiry: authToken.expiry,
  });
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    const error = new HttpError("Login Failed, please try again", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Could not log in with credentials provided",
      401
    );
    return next(error);
  }

  let passwordCorrect = false;
  try {
    passwordCorrect = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log in, please check credentials and try again",
      500
    );
    return next(error);
  }

  if (!passwordCorrect) {
    const error = new HttpError(
      "Could not log in with credentials provided",
      401
    );
    return next(error);
  }

  const authToken = await generateToken(existingUser);

  res.json({
    userId: existingUser.id,
    username: existingUser.username,
    userRole: existingUser.role,
    token: authToken.token,
    tokenExpiry: authToken.expiry,
  });
};

module.exports = {
  createUser,
  loginUser,
};
