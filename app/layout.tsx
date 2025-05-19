import "@/app/globals.css";
import { Mona_Sans as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/lib/cart-context";
import { ClerkProvider } from "@clerk/nextjs";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "TeamMeals - Hệ thống đặt cơm cho team",
  description: "Đặt cơm dễ dàng và thuận tiện cho đội nhóm của bạn",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <CartProvider>{children}</CartProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
