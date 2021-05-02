import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  album_id: Array,
  description: String,
  url: String,
  alt_description: String,
  likes: Number,
  author: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Image = mongoose.model("images", imageSchema);

export default Image;
