import mongoose from "mongoose";
import Image from "../models/image.js";

export const getCollection = async (req, res) => {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  try {
    const images = await Image.find();
    // console.log(images);
    const unique = [...new Set(images.map((image) => image[image.url]))];
    console.log(unique);
    // const uniqueImages = unique.map((image) => unique[image]);
    // var uniqueImages = images.filter(obj => {
    //   return obj.b === 6
    // })
    // console.log(uniqueImages);
    res.status(200).json(images);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addToCollection = async (req, res) => {
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

export const removeFromCollection = async (req, res) => {
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
  try {
    const newImage = new Image({
      album_id: album._id,
      url: image,
    });
    await newImage.save();
    res.json(album);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const removeFromAlbum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No image with that id");

  const updatedImage = await Image.findByIdAndUpdate(id, {
    album_id: null,
    // $set: { album_id: null },
  });
  res.json(updatedImage);
};
