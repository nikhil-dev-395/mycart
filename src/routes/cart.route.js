import { Router } from "express";
import {
  addToCart,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/cart.controller.js";

const router = Router();

router.post("/add-to-cart", addToCart);
router.get("/products", getAllUsers);
router.get("/:_id", getUser);
router.delete("/:_id", deleteUser);
router.put("/:_id", updateUser);
export { router as cartRouter };

// /api/user/:_id
