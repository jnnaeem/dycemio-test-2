import { Router } from "express";
import { authenticate, authorizeAdmin } from "../../middleware/auth";
import * as CouponController from "./coupon.controller";

const router = Router();

// Public validation
router.post("/validate", CouponController.validateCouponController);

// Admin-only CRUD
router.post("/", authenticate, authorizeAdmin, CouponController.createCouponController);
router.get("/", authenticate, authorizeAdmin, CouponController.getAllCouponsController);
router.get("/id/:id", authenticate, authorizeAdmin, CouponController.getCouponByIdController);
router.get("/:code", authenticate, authorizeAdmin, CouponController.getCouponByCodeController);
router.patch("/:id", authenticate, authorizeAdmin, CouponController.updateCouponController);
router.delete("/:id", authenticate, authorizeAdmin, CouponController.deleteCouponController);

export default router;
