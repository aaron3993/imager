import mongoose from "mongoose";
import Album from "../models/album.js";
import Image from "../models/image.js";

export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    if (albums) res.status(200).json(albums);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getAlbumImages = async (req, res) => {
  const { id } = req.params;

  try {
    const images = await Image.find({ album_id: id });
    const albumImages = await Album.findById(id);
    res.status(200).json(images);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAlbumCoverImage = async (req, res) => {
  const { id } = req.params;

  try {
    const album = await Album.findById(id);
    const coverImage = album.images[0];
    res.status(200).json(coverImage);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAlbum = async (req, res) => {
  const { id } = req.params;
  Album.findById(id)
    .then((all) => res.status(200).json(all))
    .catch((err) => res.status(400).json(err));
};

export const createAlbum = async (req, res) => {
  const album = req.body;
  const existingAlbum = await Album.findOne({ title: album.title });
  if (album.title.length < 3) {
    return res.json({
      invalid: "Please enter at least 3 characters for the title.",
    });
  }
  if (existingAlbum) {
    return res.json({ invalid: `'${album.title}' already exists!` });
  }

  try {
    const newAlbum = new Album({
      title: album.title,
    });
    await newAlbum.save();
    res.send({ newAlbum: newAlbum });
    // res.send({ valid: `'${newAlbum.title}' has been successfully created!` });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No album with that id");

  await Album.findByIdAndRemove(id);

  res.json({ message: "Image remove successfully" });
};
