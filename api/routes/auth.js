// Creating REST API routes for User Registration and Login
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

//Register REST API

router.post("/register", async (req, res) => {
  try {
    // creating hashed password from original password using bcrypt to store in database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // creating new user using user schema and filling data in them through request
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // saving this new user in our db using .save() function of mongoose
    const user = await newUser.save();

    // after succesfully saving the new user in db, sending successfull message to user
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login REST API

router.post("/login", async (req, res) => {
  try {
    // findOne() mtd confirms for the unique && Single user
    const user = await User.findOne({
      username: req.body.username,
    });
    // if User has null value then sending "wrong credential" message as response
    !user && res.status(400).json("wrong credential");

    // password comparing with req.body.password with user.password that is hashed in db
    const validated = await bcrypt.compare(req.body.password, user.password);
    // if Validated has null value then sending "wrong credential" message as response
    !validated && res.status(400).json("wrong credential");

    // after successfull login
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
