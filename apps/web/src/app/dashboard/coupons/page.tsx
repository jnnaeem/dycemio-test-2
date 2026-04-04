"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Ticket,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  RotateCw,
} from "lucide-react";
import { couponAPI } from "@/lib/services";
import { Coupon } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { SearchBar } from "@/components/admin/SearchBar";
import { EmptyState } from "@/components/admin/EmptyState";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadCoupons = async () => {
    try {
      const data = await couponAPI.getAll();
      setCoupons(data);
    } catch (err) {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await couponAPI.delete(id);
      toast.success("Coupon deleted successfully");
      setCoupons(coupons.filter((c) => c.id !== id));
    } catch (err) {
      toast.error("Failed to delete coupon");
    }
  };

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-accent font-bold md:text-2xl text-xl">Coupons</h2>
          <p className="text-accent-foreground md:text-base text-sm">
            Manage your promotional codes and discounts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => loadCoupons()}
            className="bg-white dark:bg-[#27292D] size-9.5 hover:bg-card active:scale-95 transition-all cursor-pointer shrink-0"
            title="Refresh"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-white active:scale-95 transition-all"
          >
            <Link href="/dashboard/coupons/new">
              <Plus className="h-4 w-4" />
              Create Coupon
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border card-border shadow-lg shadow-[#2E2D740D] rounded-[10px] overflow-hidden bg-card mt-8">
        <div className="bg-card-header sm:px-6 px-4 py-3 flex sm:items-center justify-between gap-4 md:flex-nowrap flex-wrap border-b card-border">
          <SearchBar
            placeholder="Search coupons by code..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        <CardContent className="p-0">
          {loading ? (
            <div className="py-20 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : filteredCoupons.length === 0 ? (
            <EmptyState
              icon={Ticket}
              title={
                searchQuery ? "No coupons match your search" : "No coupons yet"
              }
              description={
                searchQuery
                  ? "There are no coupons matching your current search criteria."
                  : "There are currently no promotional coupons available."
              }
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-default bg-muted/50">
                  <TableHead className="px-6">Code</TableHead>
                  <TableHead className="px-6">Type</TableHead>
                  <TableHead className="px-6">Value</TableHead>
                  <TableHead className="px-6">Applicable To</TableHead>
                  <TableHead className="px-6">Usage</TableHead>
                  <TableHead className="px-6">Status</TableHead>
                  <TableHead className="px-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map((coupon) => (
                  <TableRow
                    key={coupon.id}
                    className="border-default hover:bg-slate-50/50 dark:hover:bg-[#202227]/50 transition-colors"
                  >
                    <TableCell className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-slate-100 font-mono text-sm tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded w-fit">
                        {coupon.code}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 capitalize">
                      {coupon.discountType.toLowerCase()}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {coupon.discountType === "PERCENTAGE"
                          ? `${coupon.discountValue}%`
                          : `TK. ${coupon.discountValue}`}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {coupon.productId ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                            Specific Product
                          </span>
                          <span className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1 max-w-[150px]">
                            {coupon.product?.name || "Product Deleted"}
                          </span>
                        </div>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800 px-2 py-0.5"
                        >
                          All Products
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="text-xs font-medium text-slate-900 dark:text-slate-200">
                          {coupon.usedCount} / {coupon.usageLimit || "∞"}
                        </div>
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{
                              width: `${coupon.usageLimit ? Math.min(100, (coupon.usedCount / coupon.usageLimit) * 100) : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={
                          coupon.isActive
                            ? "border-green-500 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5"
                            : "border-red-500 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2 py-0.5"
                        }
                      >
                        {coupon.isActive ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="size-3" /> Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <XCircle className="size-3" /> Inactive
                          </span>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="size-8 p-0 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-32 rounded-xl dark:bg-[#191B1F] dark:border-slate-800"
                        >
                          <Link href={`/dashboard/coupons/${coupon.id}`}>
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Edit className="size-4" /> Edit
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem
                            className="gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                            onClick={() => handleDelete(coupon.id)}
                          >
                            <Trash2 className="size-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
