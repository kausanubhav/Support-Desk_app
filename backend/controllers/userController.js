const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

//@desc Register a new user
//@route /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  //Send client error ex. 400 if any input field is not filled
  if (!name || !email || !password) {
    res.status(400);
    //instead of send a json object as message
    //error() middleware is used, it sends an html
    throw Error("Please include all fields ");
  }

  //Find if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc login a user
//@route /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Check if user exists
  const user = await User.findOne({ email });
  //Check if email and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

//Generate token function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '365d' });
};

//@desc Get current user
//@route /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
  const user={
    id:req.user._id,
    email:req.user.email,
    name:req.user.name,
  }
  res.status(200).json(user);

});

module.exports = {
  registerUser,
  loginUser,
  getMe
};
