import { z } from "zod";

export const createCouponSchema = z.object({
  code: z.string().min(3).max(20).toUpperCase(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]),
  discountValue: z.number().positive(),
  minOrderAmount: z.number().nonnegative().optional(),
  maxDiscount: z.number().nonnegative().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  usageLimit: z.number().int().positive().optional(),
  isActive: z.boolean().optional().default(true),
  productId: z.string().optional(),
});

export const updateCouponSchema = createCouponSchema.partial();

export const validateCouponSchema = z.object({
  code: z.string().min(3).max(20).toUpperCase(),
  items: z.array(z.object({
    productId: String,
    quantity: Number,
    price: Number,
  })).optional(), // Optional if we want to validate just the code existence/expiry
});
