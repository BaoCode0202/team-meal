"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export function Header() {
  const { cartItems } = useCart();

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <span className="font-bold text-lg">TeamMeals</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/menu"
        >
          Thực đơn
        </Link>
        <SignedOut>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/login"
          >
            Đăng nhập
          </Link>
        </SignedOut>
      </nav>
      <div className="flex items-center gap-4 ml-4">
        <Link href="/cart" className="relative">
          <ShoppingCart className="h-6 w-6" />
          {cartItems.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-rose-600">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </Badge>
          )}
        </Link>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
