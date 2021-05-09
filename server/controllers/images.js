import mongoose from "mongoose";
import Album from "../models/album.js";
import Image from "../models/image.js";

export const getCollection = async (req, res) => {
  try {
    const images = await Image.find();
    // const uniqueImagesArray = [];
    // const uniqueImagesObject = {};
    // for (let image of images) {
    //   if (!uniqueImagesObject[image.url]) {
    //     uniqueImagesObject[image.url] = 1;
    //     uniqueImagesArray.push(image);
    //   }
    // }
    // res.status(200).json(uniqueImagesArray);
    res.status(200).json(images);
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
  // await Image.findByIdAndUpdate(id, { $pull: { album_id: id } },);

  const image = await Image.findById(id);
  const albums = await Album.find();
  for (let album of albums) {
    for (let albumImage of album.images) {
      if (albumImage.url === image.url) {
        let imageIndex = album.images.indexOf(albumImage);
        album.images.splice(imageIndex, 1);
      }
    }
    console.log(album);
    album.save();
  }

  // const before = await Album.findOne({ images: { _id: id } });
  // console.log(before);
  // for (let image of before.images) {
  //   console.log(image._id);
  // }
  await Image.findByIdAndDelete(id);
  // console.log(image.id);
  // const albums = await Album.findOneAndUpdate(
  //   { images: { _id: id } },
  //   { $pull: { images: { _id: id } } },
  //   { new: true }
  // );
  // console.log(albums);

  res.json({ message: "Image remove successfully" });
};

export const addToAlbum = async (req, res) => {
  const { album, image, collectionImage } = req.body;

  const imageUrl = image
    ? image.urls.regular
    : collectionImage
    ? collectionImage.url
    : null;

  if (!album) return res.send({ noAlbum: "No album was selected." });

  if (!mongoose.Types.ObjectId.isValid(album._id))
    return res.status(404).send("No album with that id");

  // Check if image exists in collection
  const currentImage = await Image.findOne({ url: imageUrl });
  try {
    // If image doesn't exist in collection
    if (!currentImage) {
      // Create the image
      const newImage = new Image({
        album_id: album._id,
        url: imageUrl,
      });
      // Add the image to the current album
      await Album.findByIdAndUpdate(
        album._id,
        { $push: { images: newImage } },
        { new: true }
      );
      await newImage.save();
      return res.send({ valid: `Image added to '${album.title}'!` });
    }

    // If image exists in the collection, check if it is already in the album
    const images = await Image.find({ album_id: album._id });

    // Create an object to check if the image already belongs to an album
    const uniqueImagesObject = {};
    for (let eachImage of images) {
      if (eachImage.url === imageUrl) {
        uniqueImagesObject[imageUrl] = 1;
      }
    }

    if (!uniqueImagesObject[imageUrl]) {
      // If it isn't in the album already, update the image and album
      const updatedImage = await Image.findOneAndUpdate(
        { url: imageUrl },
        { $push: { album_id: album._id } },
        { new: true }
      );
      await Album.findByIdAndUpdate(
        album._id,
        { $push: { images: updatedImage } },
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
  const { albumId, imageId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(imageId))
    return res.status(404).send("No image with that id");

  const image = await Image.findByIdAndUpdate(
    imageId,
    { $pull: { album_id: albumId } },
    { new: true }
  );
  const before = await Album.findById(albumId);
  console.log(before.images.length);
  const after = await Album.findByIdAndUpdate(
    albumId,
    { $pull: { images: { url: image.url } } },
    { new: true }
  );
  console.log(after.images.length);
  return res.status(200);
};
