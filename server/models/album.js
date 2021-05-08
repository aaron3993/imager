import mongoose from "mongoose";

const albumSchema = mongoose.Schema({
  images: Array,
  title: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Album = mongoose.model("albums", albumSchema);

export default Album;
