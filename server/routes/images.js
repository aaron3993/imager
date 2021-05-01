import express from "express";

import {
  getImages,
  addImage,
  removeImage,
  addToAlbum,
} from "../controllers/images.js";

const router = express.Router();

router.get("/", getImages);
router.post("/", addImage);
router.post("/add/album", addToAlbum);
router.delete("/:id", removeImage);

export default router;
