"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/lib/cart-context";
import { Header } from "@/components/Header";

// Define types
interface Dish {
  name: string;
  price: number;
  position: number;
  image_url: string;
  category_id: string;
  description: string;
  is_available: boolean;
}

interface MenuItem {
  id: string;
  menu_id: string;
  dish_id: string;
  dish: Dish;
}

export default function MenuPage() {
  const { toast } = useToast();
  const { addItem, cartItems, removeItem } = useCart();
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch("/api/menu");
        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }
        const data = await response.json();
        setMenuData(data);

        // Extract unique categories and create a mapping
        const categoryMap: Record<string, string> = {};
        data.forEach((item: MenuItem) => {
          if (item.dish?.category_id && !categoryMap[item.dish.category_id]) {
            categoryMap[item.dish.category_id] = `Danh mục ${
              Object.keys(categoryMap).length + 1
            }`;
          }
        });
        setCategories(categoryMap);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể tải thực đơn. Vui lòng thử lại sau.",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchMenu();
  }, [toast]);

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.dish_id,
      name: item.dish.name,
      price: item.dish.price,
      image: item.dish.image_url,
    });
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${item.dish.name} đã được thêm vào giỏ hàng của bạn.`,
      duration: 2000,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getItemQuantity = (id: string) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  // Group menu items by category
  const groupedItems = menuData.reduce<Record<string, MenuItem[]>>(
    (acc, item) => {
      const categoryId = item.dish?.category_id || "uncategorized";

      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }

      acc[categoryId].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Thực đơn hôm nay</h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>Đang tải thực đơn...</p>
            </div>
          ) : menuData.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500">
                Không có món ăn nào trong thực đơn hôm nay.
              </p>
            </div>
          ) : (
            Object.entries(groupedItems).map(([categoryId, items]) => (
              <div key={categoryId} className="mb-10">
                <h2 className="text-xl font-semibold mb-4">
                  {categories[categoryId] || "Khác"}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      {item.dish.image_url && (
                        <img
                          src={item.dish.image_url}
                          alt={item.dish.name}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/placeholder.svg?height=200&width=200";
                          }}
                        />
                      )}
                      <CardHeader>
                        <CardTitle>{item.dish.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {item.dish.description && (
                          <p className="text-zinc-500">
                            {item.dish.description}
                          </p>
                        )}
                        <p className="mt-2 font-bold text-rose-600">
                          {formatPrice(item.dish.price)}
                        </p>
                      </CardContent>
                      <CardFooter>
                        {getItemQuantity(item.dish_id) === 0 ? (
                          <Button
                            onClick={() => handleAddToCart(item)}
                            className="w-full bg-rose-600 hover:bg-rose-700"
                            disabled={!item.dish.is_available}
                          >
                            {item.dish.is_available
                              ? "Thêm vào giỏ hàng"
                              : "Hết hàng"}
                          </Button>
                        ) : (
                          <div className="flex items-center justify-between w-full">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => removeItem(item.dish_id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span>{getItemQuantity(item.dish_id)}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleAddToCart(item)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))
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
