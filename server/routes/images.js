import express from "express";

import { getImages, addImage, removeImage } from "../controllers/images.js";

const router = express.Router();

router.get("/", getImages);
router.post("/", addImage);
router.delete("/:id", removeImage);

export default router;
