import express from "express";

import {
  getAlbum,
  getAlbums,
  createAlbum,
  viewAlbum,
  deleteAlbum,
} from "../controllers/albums.js";

const router = express.Router();

router.get("/", getAlbums);
router.get("/:id", getAlbum);
router.get("/:id/images", viewAlbum);
router.post("/", createAlbum);
router.delete("/:id", deleteAlbum);

export default router;
