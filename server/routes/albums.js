import express from "express";

import { getAlbums, addAlbum, deleteAlbum } from "../controllers/albums.js";

const router = express.Router();

router.get("/", getAlbums);
router.post("/", addAlbum);
router.delete("/:id", deleteAlbum);

export default router;
