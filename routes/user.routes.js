import express from "express";
import { authUser } from "../controller/userController.js";
const router = express.Router();

router.get("/", authUser);

export default router;
