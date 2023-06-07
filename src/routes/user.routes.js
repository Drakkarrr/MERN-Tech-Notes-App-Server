import express from "express";
const router = express.Router();
import { authUser } from "../controller/user.controller.js";

router.post("/auth", authUser)

export default router;