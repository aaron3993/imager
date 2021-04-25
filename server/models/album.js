import mongoose from "mongoose";

const albumSchema = mongoose.Schema({
  title: String,
  images: Array,
  cover_image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Album = mongoose.model("albums", albumSchema);

export default Album;
