// creating app server using express
const express = require("express");
const app = express();

const multer = require("multer"); // multer library is used for image uploading
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

app.use("/images", express.static(path.join(__dirname, "/images")));

// importing all routes file
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

// Establishing connection with mongodb atlas
dotenv.config();
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("mongodb connected successfully")) //after succussfull connection, displaying successfull message
  .catch((err) => console.log(err)); // after failure, displaying error message

// to save the image in images folder with file name provided by user(req.body.name)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb refers to callback function
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

// uploading the image file
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded");
});

// telling app server to use all imported routes file
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// app server listening on port 5000 with displaying message
app.listen("5000", () => {
  console.log("Server is running on port 5000");
});
