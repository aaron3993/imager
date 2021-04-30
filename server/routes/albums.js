import express from "express";

import {
  getAlbums,
  addAlbum,
  viewAlbum,
  addToAlbum,
  deleteAlbum,
  removeFromAlbum,
} from "../controllers/albums.js";

const router = express.Router();

router.get("/", getAlbums);
router.get("/:id", viewAlbum);
router.post("/", addAlbum);
router.patch("/:id", addToAlbum);
router.delete("/:id", deleteAlbum);
router.post("/:id/images", removeFromAlbum);

export default router;
