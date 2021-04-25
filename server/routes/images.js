import express from "express";

import { getImages } from "../controllers/images.js";

const router = express.Router();

router.get("/", getImages);

export default router;
