
const asyncHandler=require('express-async-handler');

//@desc Register a new user
//@route /api/users
//@access Public
const registerUser =asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  //Send client error ex. 400
  if (!name || !email || !password) {
    res.status(400);
    //instead of send a json object as message
    //error() middleware is used, it sends an html
    throw Error('Please include all fields ');
  }
});

//@desc login a user
//@route /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  res.send("Login Route");
});

module.exports = {
  registerUser,
  loginUser,
};
