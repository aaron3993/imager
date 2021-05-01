import express from "express";

import {
  getAlbums,
  createAlbum,
  viewAlbum,
  deleteAlbum,
} from "../controllers/albums.js";

const router = express.Router();

router.get("/", getAlbums);
router.get("/:id", viewAlbum);
router.post("/", createAlbum);
router.delete("/:id", deleteAlbum);

export default router;
