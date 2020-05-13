const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const passport = require("passport");

const userRegister = async (userData, role, res) => {
  try {
    let usernameNotTaken = await validateUsername(userData.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: "Username is already taken.",
        success: false,
      });
    }
    let emailNotRegistered = await validateEmail(userData.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: "Email is already taken.",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(userData.password, 12);

    const newUser = new User({
      ...userData,
      password: hashPassword,
      role,
    });
    await newUser.save();
    return res.status(201).json({
      message: "Hurry! now  you are successfully registered.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create account",
      success: false,
    });
  }
};

const userLogin = async (userCreds, role, res) => {
  try {
    let { username, password } = userCreds;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(500).json({
        message: "Username is not found. Invalid login credentials.",
        success: false,
      });
    }
    if (user.role !== role) {
      return res.status(400).json({
        message: "Opos! you are not unauthorized to perform this operation",
        success: false,
      });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          user_id: user._id,
          role: user.role,
          username: user.username,
          email: user.email,
        },
        SECRET,
        {
          expiresIn: "2 days",
        }
      );

      let result = {
        username: user.username,
        role: user.role,
        email: user.email,
        token: "Bearer " + token,
        expiresIn: "2 days",
      };

      return res.status(201).json({
        ...result,
        message: "Yep! you are logged in.",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Unable to logged in! try after some time",
      success: false,
    });
  }
};

const userAuth = passport.authenticate("jwt", { session: false });

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const serializeUser = (request) => {
  return {
    user_id: request._id,
    name: request.name,
    email: request.email,
    username: request.username,
    role: request.role,
  };
};

const checkRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).send("Unauthorized")
    : next();

module.exports = {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
};
