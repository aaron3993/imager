import express from "express";

import { getImages, addImage } from "../controllers/images.js";

const router = express.Router();

router.get("/", getImages);
router.post("/", addImage);

export default router;
