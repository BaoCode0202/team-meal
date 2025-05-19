import { NextResponse } from "next/server";
import { MenuService } from "@/lib/menu-service";

export async function GET() {
  try {
    const menuData = await MenuService.getActiveMenu();
    return NextResponse.json(menuData?.dishes || []);
  } catch (error) {
    console.error("Error fetching menu:", error);
    return NextResponse.json(
      { error: "Failed to load menu data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const menuData = await request.json();

    // Validate the data structure (basic validation)
    if (!Array.isArray(menuData)) {
      return NextResponse.json(
        { error: "Invalid menu data format" },
        { status: 400 }
      );
    }

    // TODO: Implement menu data update logic using Supabase
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save menu data" },
      { status: 500 }
    );
  }
}
