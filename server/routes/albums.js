import express from "express";

import {
  getAlbums,
  addAlbum,
  addToAlbum,
  deleteAlbum,
} from "../controllers/albums.js";

const router = express.Router();

router.get("/", getAlbums);
router.post("/", addAlbum);
router.patch("/:id", addToAlbum);
router.delete("/:id", deleteAlbum);

export default router;
