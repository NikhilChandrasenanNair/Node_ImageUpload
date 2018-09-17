const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ImagesSchema = new Schema({
  name: String,
  data: Buffer,
  contentType: String
});

// export the mongoose model
module.exports = mongoose.model("Image", ImagesSchema);
