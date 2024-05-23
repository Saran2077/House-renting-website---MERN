import express from "express"
import { propertyValidator } from "./../middlewares/validator.js"
import { addProperty, getProperty, likeUnlikeProperty } from "../controllers/propertyController.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.post("/add", propertyValidator,protectRoute , addProperty)

router.get("/like/:id", protectRoute, likeUnlikeProperty)

router.get("/:id", getProperty)


export default router