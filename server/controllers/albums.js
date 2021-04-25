import Album from "../models/album.js";

export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addAlbum = async (req, res) => {
  const album = req.body;
  const newAlbum = new Album({
    name: album.name,
    images: album.images,
  });

  try {
    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
