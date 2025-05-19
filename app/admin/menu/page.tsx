"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { Loader2 } from "lucide-react";

export default function AdminMenuPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [menuData, setMenuData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let parsedData;
      try {
        parsedData = JSON.parse(menuData);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Lỗi định dạng JSON",
          description:
            "Dữ liệu không đúng định dạng JSON. Vui lòng kiểm tra lại.",
        });
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) {
        throw new Error("Không thể lưu dữ liệu thực đơn");
      }

      toast({
        title: "Thành công",
        description: "Dữ liệu thực đơn đã được cập nhật.",
      });

      // Refresh data in the menu page
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi lưu dữ liệu thực đơn.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCurrentMenu = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/menu");
      if (!response.ok) {
        throw new Error("Không thể tải dữ liệu thực đơn");
      }
      const data = await response.json();
      setMenuData(JSON.stringify(data, null, 2));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi tải dữ liệu thực đơn.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Quản lý thực đơn</h1>
          <Card>
            <CardHeader>
              <CardTitle>Cập nhật thực đơn</CardTitle>
              <CardDescription>
                Dán dữ liệu thực đơn dạng JSON vào ô bên dưới và nhấn "Cập nhật"
                để lưu.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="flex justify-end mb-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={loadCurrentMenu}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang tải...
                      </>
                    ) : (
                      "Tải thực đơn hiện tại"
                    )}
                  </Button>
                </div>
                <Textarea
                  value={menuData}
                  onChange={(e) => setMenuData(e.target.value)}
                  placeholder="Dán dữ liệu JSON ở đây..."
                  className="font-mono h-96"
                  required
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Quay lại
                </Button>
                <Button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang cập nhật...
                    </>
                  ) : (
                    "Cập nhật thực đơn"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
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
