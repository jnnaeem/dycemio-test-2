"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { orderAPI } from "@/lib/services";
import { Order } from "@/types";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, restoreFromStorage, logout } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreFromStorage();
  }, []);

  useEffect(() => {
    if (user && user.role !== "ADMIN" && !loading) {
      router.push("/");
    } else if (user?.role === "ADMIN") {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      // This would need an admin-specific endpoint
      const data = await orderAPI.getOrders();
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (!user || user.role !== "ADMIN") {
    return <div className="text-center py-20">Admin access required</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              🎲 Dycemio Admin
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Admin Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <Link
              href="/admin/products/new"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
            >
              Add Product
            </Link>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Order #
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">
                    ${Number(order.totalAmount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
