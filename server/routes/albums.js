import express from "express";

import { getAlbums, addAlbum, deleteAlbum } from "../controllers/images.js";

const router = express.Router();

router.get("/", getAlbums);
router.post("/", addAlbum);
router.post("/", deleteAlbum);

export default router;
