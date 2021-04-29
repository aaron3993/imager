import mongoose from "mongoose";
import Album from "../models/album.js";

export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const viewAlbum = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findById(id);
    res.status(200).json(album.images);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addAlbum = async (req, res) => {
  const album = req.body;
  const newAlbum = new Album({
    title: album.title,
  });

  try {
    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const addToAlbum = async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No album with that id");

  const album = await Album.findByIdAndUpdate(
    id,
    { $push: { images: image } },
    { new: true }
  );
  console.log(album);
  res.json(album);
  // try {
  //   await newAlbum.save();
  //   res.status(201).json(newAlbum);
  // } catch (err) {
  //   res.status(409).json({ message: err.message });
  // }
};

export const removeFromAlbum = async (req, res) => {
  const { key, title } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id))
  //   return res.status(404).send("No album with that id");

  // const album = await Album.findByIdAndUpdate(
  //   id,
  //   { $push: { images: image } },
  //   { new: true }
  // );
  // // avorite.updateOne( {cn: req.params.name}, { $pullAll: {uid: [req.params.deleteUid] } }
  // console.log(album);
  // res.json(album);
  // try {
  //   await newAlbum.save();
  //   res.status(201).json(newAlbum);
  // } catch (err) {
  //   res.status(409).json({ message: err.message });
  // }
};

export const deleteAlbum = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No album with that id");

  await Album.findByIdAndRemove(id);

  res.json({ message: "Image remove successfully" });
};
