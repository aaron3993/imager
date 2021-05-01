import mongoose from "mongoose";
import Image from "../models/image.js";

export const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addImage = async (req, res) => {
  const image = req.body;
  const newImage = new Image({
    description: image.description,
    url: image.urls.regular,
    alt_description: image.urls.alt_description,
    likes: image.likes,
    author: image.user.links.name,
  });

  try {
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const removeImage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No image with that id");
  await Image.findByIdAndRemove(id);

  res.json({ message: "Image remove successfully" });
};

export const addToAlbum = async (req, res) => {
  const { album, image } = req.body;
  console.log(image);
  if (!mongoose.Types.ObjectId.isValid(album._id))
    return res.status(404).send("No album with that id");
  // const imageExists = await Album.find({ image: image });
  // console.log(imageExists);
  // if (imageExists) return res.send("This image already exists in this album.");
  // console.log(imageExists);
  const newImage = new Image({
    album_id: album._id,
    url: image,
  });
  // const album = await Album.findByIdAndUpdate(
  //   album._id,
  //   { $push: { images: image } },
  //   { new: true }
  // );
  await newImage.save();
  res.json(album);
  // try {
  //   await newAlbum.save();
  //   res.status(201).json(newAlbum);
  // } catch (err) {
  //   res.status(409).json({ message: err.message });
  // }
};
