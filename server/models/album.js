import mongoose from "mongoose";

const albumSchema = mongoose.Schema({
  image_id: Array,
  title: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Album = mongoose.model("albums", albumSchema);

export default Album;
