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
      res.send({ valid: "Image added to collection!" });
    } else {
      res.send({ invalid: "This image has already been added." });
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const removeFromCollection = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No image with that id");
  await Image.findByIdAndDelete(id);

  res.json({ message: "Image remove successfully" });
};

export const addToAlbum = async (req, res) => {
  const { album, image } = req.body;

  if (!album) return res.send({ invalid: "No album was selected." });

  if (!mongoose.Types.ObjectId.isValid(album._id))
    return res.status(404).send("No album with that id");

  // Check if image exists in collection
  const currentImage = await Image.findOne({ url: image });

  try {
    // If image doesn't exist in collection
    if (!currentImage) {
      // Create the image
      const newImage = new Image({
        album_id: album._id,
        url: image,
      });
      await newImage.save();
      return res.send({ valid: `Image added to '${album.title}'!` });
    }

    // If image exists in the collection, check if it is already in the album
    // Create an object to check if the image already belongs to an album
    const images = await Image.find({ album_id: album._id });

    const uniqueImagesObject = {};
    for (let eachImage of images) {
      if (eachImage.url === image) {
        uniqueImagesObject[image] = 1;
      }
    }

    if (!uniqueImagesObject[image]) {
      // If it isn't in the album already, update the image
      const updatedImage = await Image.findOneAndUpdate(
        { url: image },
        { $push: { album_id: album._id } },
        { new: true }
      );
      await updatedImage.save();
      return res.send({ valid: `Image added to '${album.title}'!` });
    }

    // If image exists in the album already
    return res.send({
      invalid: `'${album.title}' already contains this image.`,
    });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const removeFromAlbum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No image with that id");

  await Image.findByIdAndDelete(id);
};
