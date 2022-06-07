// all REST API For Post
const router = require("express").Router();
const Post = require("../models/Post");

// Create new Post

router.post("/", async (req, res) => {
  //creating new Post using Post model
  const newPost = new Post(req.body);
  try {
    //Saving and Sending as response
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Specific Post

router.put("/:id", async (req, res) => {
  try {
    // finding that specific post that has requested id
    const post = await Post.findById(req.params.id);
    // checking for same user post
    if (post.username === req.body.username) {
      try {
        // setting new post && sending response
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can update only your post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Specific Post

router.delete("/:id", async (req, res) => {
  try {
    // finding that specific post
    const specificPost = await Post.findById(req.params.id);
    if (specificPost.username === req.body.username) {
      try {
        // deleting specific post and sending response
        await specificPost.delete();
        res.status(200).json("Post Deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can delete only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get single Specific Post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Posts based on Query Parameter
router.get("/", async (req, res) => {
  // assigning query parameter value to respective variable
  const username = req.query.user;
  const catname = req.query.cat;

  try {
    let posts;
    // if query parameter contain username or category name
    if (username) {
      posts = await Post.find({ username: username });
    } else if (catname) {
      posts = await Post.find({
        categories: {
          $in: [catname],
        },
      });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
