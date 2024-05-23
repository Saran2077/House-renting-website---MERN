import express from "express";
import { register, login, addRemoveWishlist, getWishList, logout } from "./../controllers/userController.js"
import { registerValidator } from "../middlewares/validator.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router()

router.post("/register", registerValidator, register)

router.post("/login", login)

router.post("/logout", logout)

router.get("/wishlist", protectRoute, getWishList);

router.post("/wishlist", protectRoute, addRemoveWishlist);

export default router