"use strict";

const express = require("express");
const multer = require("multer");
const fileType = require("file-type");
const fs = require("fs");
const app = express();
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
//import mongoose
const mongoose = require("mongoose");

//Model
const Image = require("./models/images");

const url =
  "mongodb://admin:admin1234@ds251622.mlab.com:51622/multerimageupload";

const port = process.env.PORT || 8080;
let db;
MongoClient.connect(
  url,
  { useNewUrlParser: true },
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("multerimageupload");
  }
);

/* const upload = multer({
  dest: "images/",
  limits: { fileSize: 10000000, files: 1 },
  fileFilter: (req, file, callback) => {
    file.id = 100;
    if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
      return callback(new Error("Only Images are allowed !"), false);
    }
    callback(null, true);
  }
});

router.post("/images/upload", upload.single("image"), (req, res) => {
  db.collection("images").save(req.file, (err, result) => {
    if (err) return console.log(err);
    res.send("Image uploaded successfully");
  });
});

router.get("/images/:imagename", (req, res) => {
  let imagename = req.params.imagename;
  let imagepath = __dirname + "/images/" + imagename;
  let image = fs.readFileSync(imagepath);
  let mime = fileType(image).mime;

  res.writeHead(200, { "Content-Type": mime });
  res.end(image, "binary");
}); */

app.use("/", router);

app.use((err, req, res, next) => {
  if (err.code == "ENOENT") {
    res.status(404).json({ message: "Image Not Found !" });
  } else {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port);
console.log(`App Runs on ${port}`);
