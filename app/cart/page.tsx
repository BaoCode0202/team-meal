"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/lib/cart-context";
import PaymentForm from "@/components/payment-form";
import { Header } from "@/components/Header";

export default function CartPage() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { cartItems, updateQuantity, removeItem, clearCart, getTotal } =
    useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center mb-6">
            <Link
              href="/menu"
              className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Quay lại thực đơn
            </Link>
            <h1 className="text-2xl font-bold ml-auto">Giỏ hàng</h1>
          </div>

          {cartItems.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold mb-2">
                    Giỏ hàng của bạn đang trống
                  </h2>
                  <p className="text-zinc-500 mb-6">
                    Hãy thêm món ăn vào giỏ hàng để tiếp tục.
                  </p>
                  <Link href="/menu">
                    <Button>Xem thực đơn</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : isCheckingOut ? (
            <div className="grid gap-6 md:grid-cols-5">
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Thông tin thanh toán</CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentForm total={getTotal()} onComplete={clearCart} />
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Tóm tắt đơn hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between py-2">
                      <div>
                        <span>{item.quantity} x </span>
                        <span>{item.name}</span>
                      </div>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <Separator className="my-4" />
                  <div className="flex justify-between font-bold">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsCheckingOut(false)}
                  >
                    Quay lại giỏ hàng
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Các món đã chọn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Món ăn</TableHead>
                          <TableHead className="text-right">Số lượng</TableHead>
                          <TableHead className="text-right">Giá</TableHead>
                          <TableHead className="text-right">
                            Thành tiền
                          </TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                >
                                  <span className="sr-only">Giảm</span>
                                  <span>-</span>
                                </Button>
                                <span className="px-2">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  <span className="sr-only">Tăng</span>
                                  <span>+</span>
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              {formatPrice(item.price)}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {formatPrice(item.price * item.quantity)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Xóa</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Tóm tắt đơn hàng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Tổng tiền món ăn</span>
                        <span>{formatPrice(getTotal())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phí giao hàng</span>
                        <span>Miễn phí</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Tổng cộng</span>
                        <span>{formatPrice(getTotal())}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button
                      className="w-full bg-rose-600 hover:bg-rose-700"
                      onClick={handleCheckout}
                    >
                      Tiến hành thanh toán
                    </Button>
                    <Link href="/menu" className="w-full">
                      <Button variant="outline" className="w-full">
                        Tiếp tục đặt món
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-zinc-500">
          © 2025 TeamMeals. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Điều khoản dịch vụ
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Chính sách bảo mật
          </Link>
        </nav>
      </footer>
    </div>
  );
}
