import express from "express";

import {
  getAlbums,
  addAlbum,
  viewAlbum,
  deleteAlbum,
} from "../controllers/albums.js";

const router = express.Router();

router.get("/", getAlbums);
router.get("/:id", viewAlbum);
router.post("/", addAlbum);
router.delete("/:id", deleteAlbum);

export default router;
