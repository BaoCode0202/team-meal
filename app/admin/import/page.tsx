"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function ImportMenuDishes() {
  const [menuId, setMenuId] = useState("");
  const [jsonData, setJsonData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  // Kiểm tra nếu người dùng là admin
  useEffect(() => {
    async function checkAdmin() {
      try {
        const response = await fetch("/api/admin/check");
        const data = await response.json();

        if (response.ok && data.isAdmin) {
          setIsAdmin(true);
        } else {
          // Nếu không phải admin, chuyển về trang chủ
          toast.error("You do not have permission to access this page");
          router.push("/");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        toast.error("An error occurred while checking permissions");
        router.push("/");
      } finally {
        setIsChecking(false);
      }
    }

    checkAdmin();
  }, [router]);

  const handleImport = async () => {
    try {
      setIsLoading(true);

      // Validate inputs
      if (!menuId.trim()) {
        toast.error("Menu ID is required");
        return;
      }

      if (!jsonData.trim()) {
        toast.error("JSON data is required");
        return;
      }

      // Parse JSON data
      let menuDishes;
      try {
        menuDishes = JSON.parse(jsonData);
        if (!Array.isArray(menuDishes)) {
          toast.error("Invalid JSON format. Data must be an array.");
          return;
        }
      } catch (error) {
        toast.error("Invalid JSON format");
        return;
      }

      // Make API request
      const response = await fetch("/api/menu/dishes/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ menuId, menuDishes }),
      });

      let result;
      try {
        result = await response.json();
      } catch (error) {
        console.error("Error parsing response:", error);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(result.error || "Failed to import menu dishes");
      }

      toast.success(result.message || "Menu dishes imported successfully");
    } catch (error) {
      console.error("Import error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to import menu dishes"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Hiển thị loading hoặc thông báo lỗi khi đang kiểm tra quyền
  if (isChecking) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p>Checking permissions...</p>
      </div>
    );
  }

  // Nếu không phải admin, sẽ chuyển hướng trong useEffect
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Import Menu Dishes</CardTitle>
          <CardDescription>
            Import menu dishes from JSON data. Any existing dishes for the
            selected menu will be replaced.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="menu-id">Menu ID</Label>
            <Input
              id="menu-id"
              value={menuId}
              onChange={(e) => setMenuId(e.target.value)}
              placeholder="Enter menu ID"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="json-data">JSON Data</Label>
            <Textarea
              id="json-data"
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              placeholder="Paste JSON data here"
              className="min-h-[300px] font-mono"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleImport}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Importing..." : "Import Menu Dishes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
