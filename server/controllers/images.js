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
