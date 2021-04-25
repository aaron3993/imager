import mongoose from "mongoose";

const albumSchema = mongoose.Schema({
  name: String,
  images: Array,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Album = mongoose.model("albums", albumSchema);

export default Album;
