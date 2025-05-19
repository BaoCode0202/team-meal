"use client";

import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { Header } from "@/components/Header";
import { useCart } from "@/lib/cart-context";

export default function LoginPage() {
  const { cartItems } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: "bg-rose-600 hover:bg-rose-700",
                footerActionLink: "text-rose-600 hover:text-rose-700",
              },
            }}
          />
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
