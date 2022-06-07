// REST API For Updating Deleting && Getting User Detail
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");

// Update specific user

router.put("/:id", async (req, res) => {
  // checking for same user
  if (req.body.userId === req.params.id) {
    // if request body contains password then making it hashed password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, // set methods set that user with new request body data
        },
        { new: true } // making new as true to make changes effective
      );

      // sending response as updated user data
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("you can update only your account!");
  }
});

// Delete specific user

router.delete("/:id", async (req, res) => {
  // checking for same user
  if (req.body.userId === req.params.id) {
    try {
      // finding that specific user
      const user = await User.findById(req.params.id);

      try {
        // deleting all post of that user
        await Post.deleteMany({ username: user.username });
        // deleting that user
        await User.findByIdAndDelete(req.params.id);
        //sending response message
        res.status(200).json("user has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(500).json("User not found!");
    }
  } else {
    res.status(401).json("you can delete only your account!");
  }
});

// Get specific user

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
