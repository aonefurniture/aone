import express from "express";
import {
  createSubscribe,
  deleteSubscribe,
  getAllSubscribe,
  getSubscribe,
  updateSubscribe,
} from "../controllers/subscribes.js";
import { isAuth } from "../utils/isAuth.js";

const router = express.Router();

//create subscribe
router.post("/", createSubscribe);
//update subscribe
router.put("/:id", isAuth, updateSubscribe);
//delete subscribe
router.delete("/:id", isAuth, deleteSubscribe);
//get subscribe
router.get("/:id", isAuth, getSubscribe);
//getall subscribe
router.get("/", isAuth, getAllSubscribe);

export default router;
