import { asyncHandler } from "../../middleware/asyncHandler";
import { sendSuccess } from "../../utils/response";
import { BadRequestError } from "../../utils/errors";
import { createOrderSchema, updateOrderStatusSchema } from "./order.validation";
import {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders,
} from "./order.service";

export const createOrderController = asyncHandler(async (req: any, res) => {
  const result = createOrderSchema.safeParse(req.body);

  if (!result.success) {
    throw new BadRequestError(result.error.issues[0].message);
  }

  const order = await createOrder(req.user.userId, result.data);
  sendSuccess(res, 201, order, "Order created successfully");
});

export const getUserOrdersController = asyncHandler(async (req: any, res) => {
  const orders = await getUserOrders(req.user.userId);
  sendSuccess(res, 200, orders, "Orders retrieved successfully");
});

export const getOrderController = asyncHandler(async (req: any, res) => {
  const order = await getOrder(req.user.userId, req.params.id as string);
  sendSuccess(res, 200, order, "Order retrieved successfully");
});

export const updateOrderStatusController = asyncHandler(async (req: any, res) => {
  const result = updateOrderStatusSchema.safeParse(req.body);

  if (!result.success) {
    throw new BadRequestError(result.error.issues[0].message);
  }

  const order = await updateOrderStatus(req.params.id as string, result.data);
  sendSuccess(res, 200, order, "Order updated successfully");
});

export const getAllOrdersController = asyncHandler(async (req: any, res) => {
  const orders = await getAllOrders();
  sendSuccess(res, 200, orders, "All orders retrieved successfully");
});
