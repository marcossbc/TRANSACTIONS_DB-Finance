import express from "express";
// import {  login, register } from "../controllers/AuthController.js";
// import { getUsers } from "../controllers/UsersController.js";
import { login, register } from "../controllers/AuthControllers.js";
import { getUsers } from "../controllers/UsersControllers.js";





const router = express.Router()
// routes.get("/", getUsers)
router.post("/create", register)
router.post("/login",  login)
router.get("/", getUsers)

export default router;