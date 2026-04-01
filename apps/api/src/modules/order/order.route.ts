import { Router } from "express";
import { authenticate, authorizeAdmin } from "../../middleware/auth";
import {
  createOrderController,
  getUserOrdersController,
  getOrderController,
  updateOrderStatusController,
  getAllOrdersController,
} from "./order.controller";

const router = Router();

// Customer routes
router.post("/", authenticate, createOrderController);
router.get("/", authenticate, getUserOrdersController);
router.get("/:id", authenticate, getOrderController);

// Admin routes
router.get("/all", authenticate, authorizeAdmin, getAllOrdersController);
router.put("/:id/status", authenticate, authorizeAdmin, updateOrderStatusController);

export default router;
