import mongoose from "mongoose";
import Album from "../models/album.js";
import Image from "../models/image.js";

export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    console.log({ albums });
    res.status(200).json(albums);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const viewAlbum = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  Image.find({ album_id: id })
    .then((all) => res.status(200).json(all))
    .catch((err) => res.status(400).json(err));
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
  // const { id } = req.params;
  // const { image } = req.body;
  // if (!mongoose.Types.ObjectId.isValid(id))
  //   return res.status(404).send("No album with that id");
  // // const imageExists = await Album.find({ image: image });
  // // console.log(imageExists);
  // // if (imageExists) return res.send("This image already exists in this album.");
  // // console.log(imageExists);
  // const album = await Album.findByIdAndUpdate(
  //   id,
  //   { $push: { images: image } },
  //   { new: true }
  // );
  // res.json(album);
  // // try {
  // //   await newAlbum.save();
  // //   res.status(201).json(newAlbum);
  // // } catch (err) {
  // //   res.status(409).json({ message: err.message });
  // // }
};

export const removeFromAlbum = async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No album with that id");

  const album = await Album.findByIdAndUpdate(
    id,
    { $pull: { images: image } },
    { new: true }
  );
  res.json(album);
  // // avorite.updateOne( {cn: req.params.name}, { $pullAll: {uid: [req.params.deleteUid] } }
  // console.log(album);
};

export const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No album with that id");

  await Album.findByIdAndRemove(id);

  res.json({ message: "Image remove successfully" });
};
