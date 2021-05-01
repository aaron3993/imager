import express from "express";

import {
  getImages,
  addImage,
  removeImage,
  addToAlbum,
  removeFromAlbum,
} from "../controllers/images.js";

const router = express.Router();

router.get("/", getImages);
router.post("/", addImage);
router.post("/add/album", addToAlbum);
router.delete("/:id", removeImage);
router.patch("/:id", removeFromAlbum);

export default router;
