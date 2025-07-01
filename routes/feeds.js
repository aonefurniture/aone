import express from "express";
import { createFeed, deleteFeed, getAllFeed } from "../controllers/feed.js";
import { isAuth } from "../utils/isAuth.js";

const router = express.Router();

//create Feed
router.post("/", createFeed);
//delete Feed
router.delete("/:id", isAuth, deleteFeed);
//getall Feed
router.get("/", getAllFeed);

export default router;
