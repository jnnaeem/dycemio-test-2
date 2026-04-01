import { z } from "zod";

export const createOrderSchema = z.object({
  shippingAddressId: z.string().min(1, "Shipping address is required"),
  notes: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"]),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
