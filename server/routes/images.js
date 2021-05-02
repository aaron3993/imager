import express from "express";

import {
  getCollection,
  addToCollection,
  removeFromCollection,
  addToAlbum,
  removeFromAlbum,
} from "../controllers/images.js";

const router = express.Router();

router.get("/collection", getCollection);
router.post("/collection", addToCollection);
router.post("/album", addToAlbum);
router.patch("/collection/:id", removeFromCollection);
router.patch("/album/:id", removeFromAlbum);

export default router;
