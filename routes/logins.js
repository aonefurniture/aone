import express from "express";
import { loadAdmin, loginAdmin, logoutAdmin } from "../controllers/login.js";
import { isAuth } from "../utils/isAuth.js";

const router = express.Router();

//login admin
router.post("/", loginAdmin);

//login admin
router.post("/logout", logoutAdmin);

//login admin
router.get("/load", isAuth, loadAdmin);

export default router;
