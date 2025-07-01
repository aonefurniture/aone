import express from "express";
import {
  createOrder,
  createwhatsappOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
  updateOrder,
} from "../controllers/orders.js";
import { isAuth } from "../utils/isAuth.js";

const router = express.Router();

//create order
router.post("/", createOrder);
//update order
router.put("/:id", isAuth, updateOrder);
//delete order
router.delete("/:id", isAuth, deleteOrder);
//get order
router.get("/:id", isAuth, getOrder);
//getall order
router.get("/", isAuth, getAllOrder);

export default router;
