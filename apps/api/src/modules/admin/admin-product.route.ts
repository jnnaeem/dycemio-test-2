import { Router } from "express";
import { authenticate, authorizeAdmin } from "../../middleware/auth";
import {
  createProductController,
  updateProductController,
  deleteProductController,
} from "./admin-product.controller";

const router = Router();

router.post("/", authenticate, authorizeAdmin, createProductController);
router.put("/:id", authenticate, authorizeAdmin, updateProductController);
router.delete("/:id", authenticate, authorizeAdmin, deleteProductController);

export default router;
