//// REST API For Posting && getting Category Detail
const router = require("express").Router();
const Category = require("../models/Category");

// Posting Category API

router.post("/", async (req, res) => {
  // making new Category using Category model
  const newCat = new Category(req.body);
  try {
    // saving newCat into database
    const savedCat = await newCat.save();
    // sending response
    res.status(200).json(savedCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Getting Category API
router.get("/", async (req, res) => {
  try {
    const Cats = await Category.find();
    res.status(200).json(Cats);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
