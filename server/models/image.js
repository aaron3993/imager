import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  title: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Image = mongoose.model("images", imageSchema);

export default Image;
