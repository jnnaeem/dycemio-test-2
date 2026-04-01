import prisma from "../../config/database";
import {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} from "../../utils/errors";
import { CreateOrderInput, UpdateOrderStatusInput } from "./order.validation";

export const createOrder = async (userId: string, input: CreateOrderInput) => {
  // Verify address belongs to user
  const address = await prisma.address.findFirst({
    where: {
      id: input.shippingAddressId,
      userId,
    },
  });

  if (!address) {
    throw new NotFoundError("Shipping address not found");
  }

  // Get user's cart
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new BadRequestError("Cart is empty");
  }

  // Calculate total
  let totalAmount = 0;
  for (const item of cart.items) {
    totalAmount += Number(item.product.price) * item.quantity;
  }

  // Create order
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId,
      status: "PENDING",
      paymentStatus: "PENDING",
      totalAmount,
      shippingAddressId: input.shippingAddressId,
      notes: input.notes,
      items: {
        create: cart.items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  // Clear cart
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return order;
};

export const getUserOrders = async (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getOrder = async (userId: string, orderId: string) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    include: {
      items: {
        include: { product: true },
      },
      payment: true,
    },
  });

  if (!order) {
    throw new NotFoundError("Order not found");
  }

  return order;
};

export const updateOrderStatus = async (
  orderId: string,
  input: UpdateOrderStatusInput
) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new NotFoundError("Order not found");
  }

  return prisma.order.update({
    where: { id: orderId },
    data: { status: input.status },
    include: {
      items: {
        include: { product: true },
      },
      payment: true,
    },
  });
};

export const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      items: {
        include: { product: true },
      },
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });
};
