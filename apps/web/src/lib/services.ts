import api from "./api";
import { AuthResponse, Order, Coupon, CouponValidationResult } from "../types";

export const authAPI = {
  signup: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    const response = await api.post("/auth/signup", data);
    return response.data.data as AuthResponse;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post("/auth/login", data);
    return response.data.data as AuthResponse;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data.data;
  },

  updateProfile: async (data: { firstName?: string; lastName?: string; phone?: string }) => {
    const response = await api.patch("/auth/profile", data);
    return response.data.data;
  },

  changePassword: async (data: { currentPassword?: string; newPassword?: string }) => {
    const response = await api.patch("/auth/change-password", data);
    return response.data.data;
  },
};

export const productAPI = {
  getAll: async () => {
    const response = await api.get("/products");
    return response.data.data;
  },

  getOne: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
  },
};

export const cartAPI = {
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data.data;
  },

  addItem: async (data: { productId: string; quantity: number }) => {
    const response = await api.post("/cart/items", data);
    return response.data.data;
  },

  updateItem: async (id: string, data: { quantity: number }) => {
    const response = await api.put(`/cart/items/${id}`, data);
    return response.data.data;
  },

  removeItem: async (id: string) => {
    await api.delete(`/cart/items/${id}`);
  },
};

export const orderAPI = {
  create: async (data: { shippingAddressId: string; notes?: string }) => {
    const response = await api.post("/orders", data);
    return response.data.data;
  },

  getOrders: async () => {
    const response = await api.get("/orders");
    return response.data.data as Order[];
  },

  getOne: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data.data;
  },
};

export const couponAPI = {
  getAll: async () => {
    const response = await api.get("/coupons");
    return response.data.data as Coupon[];
  },
  getByCode: async (code: string) => {
    const response = await api.get(`/coupons/${code}`);
    return response.data.data as Coupon;
  },
  getById: async (id: string) => {
    const response = await api.get(`/coupons/id/${id}`);
    return response.data.data as Coupon;
  },
  create: async (data: any) => {
    const response = await api.post("/coupons", data);
    return response.data.data as Coupon;
  },
  update: async (id: string, data: any) => {
    const response = await api.patch(`/coupons/${id}`, data);
    return response.data.data as Coupon;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/coupons/${id}`);
    return response.data.data;
  },
  validate: async (code: string, items: any[]) => {
    const response = await api.post("/coupons/validate", { code, items });
    return response.data.data as CouponValidationResult;
  },
};
