import mongoose from "mongoose";
import Image from "../models/image.js";

export const getCollection = async (req, res) => {
  try {
    const images = await Image.find();
    const uniqueImagesArray = [];
    const uniqueImagesObject = {};
    for (let image of images) {
      if (!uniqueImagesObject[image.url]) {
        uniqueImagesObject[image.url] = 1;
        uniqueImagesArray.push(image);
      }
    }
    res.status(200).json(uniqueImagesArray);
    // res.status(200).json(images);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addToCollection = async (req, res) => {
  const image = req.body;
  const currentUrl = image.urls.regular;

  const images = await Image.find();
  const uniqueImagesObject = {};
  for (let eachImage of images) {
    if (eachImage.url === currentUrl) {
      uniqueImagesObject[currentUrl] = 1;
    }
  }

  try {
    if (!uniqueImagesObject[currentUrl]) {
      const newImage = new Image({
        description: image.description,
        url: currentUrl,
        alt_description: image.urls.alt_description,
        likes: image.likes,
        author: image.user.links.name,
      });
      await newImage.save();
      res.status(201).json(newImage);
    } else {
      console.log("This image has already been added");
      res.send({ message: "This image has already been added" });
    }
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

  if (!mongoose.Types.ObjectId.isValid(album._id))
    return res.status(404).send("No album with that id");

  const images = await Image.find({ album_id: album._id });
  const uniqueImagesObject = {};
  for (let eachImage of images) {
    if (eachImage.url === image) {
      uniqueImagesObject[image] = 1;
    }
  }

  try {
    if (!uniqueImagesObject[image]) {
      const newImage = new Image({
        album_id: album._id,
        url: image,
      });
      await newImage.save();
      res.status(201).json(newImage);
    } else {
      console.log("This image has already been added");
      res.send({ message: "This image has already been added" });
    }
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
