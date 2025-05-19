import { NextResponse } from "next/server";
import { importMenuDishes, MenuDish } from "@/lib/supabase";
import { adminOnly } from "@/lib/auth";

// Xử lý yêu cầu POST được bảo vệ bởi adminOnly
async function handlePostRequest(request: Request) {
  try {
    console.log("Starting import process...");

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error("Error parsing request body:", error);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { menuId, menuDishes } = body;
    console.log("Received data:", {
      menuId,
      menuDishesCount: menuDishes?.length,
    });

    // Validate the data structure
    if (!menuId || !Array.isArray(menuDishes)) {
      console.error("Invalid data format:", { menuId, menuDishes });
      return NextResponse.json(
        { error: "Invalid data format. Required: menuId and menuDishes array" },
        { status: 400 }
      );
    }

    // Import the menu dishes
    console.log("Calling importMenuDishes...");
    const result = await importMenuDishes(menuDishes, menuId);
    console.log("Import result:", result);

    if (!result.success) {
      console.error("Import failed:", result.error);
      return NextResponse.json(
        {
          error: "Failed to import menu dishes",
          details:
            result.error instanceof Error
              ? result.error.message
              : String(result.error),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${menuDishes.length} dishes for menu ${menuId}`,
    });
  } catch (error) {
    console.error("Error importing menu dishes:", error);
    return NextResponse.json(
      {
        error: "Failed to import menu dishes",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// Áp dụng adminOnly middleware cho xử lý POST
export const POST = adminOnly(handlePostRequest);
