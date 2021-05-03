import express from "express";

import {
  getAlbumImages,
  getAlbums,
  createAlbum,
  getAlbum,
  deleteAlbum,
} from "../controllers/albums.js";

const router = express.Router();

router.get("/", getAlbums);
router.get("/:id", getAlbum);
router.get("/:id/images", getAlbumImages);
router.post("/", createAlbum);
router.delete("/:id", deleteAlbum);

export default router;
