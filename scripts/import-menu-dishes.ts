/**
 * Menu Dishes Import Script
 *
 * This script can be used to import menu dishes from a JSON file.
 * Usage: ts-node import-menu-dishes.ts <adminApiKey> <menuId> <filePath>
 *
 * Example: ts-node import-menu-dishes.ts your_admin_api_key 0296d2d4-b0b6-4c56-95f7-587b661bbb6b ./data/menu-dishes.json
 */

import { importMenuDishes } from "../lib/supabase";
import fs from "fs";
import path from "path";

// Khai báo API key dành cho admin
// (nên được lưu trong biến môi trường để an toàn hơn)
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "";

async function importDishesFromFile() {
  // Check args
  if (process.argv.length < 5) {
    console.error(
      "Usage: ts-node import-menu-dishes.ts <adminApiKey> <menuId> <filePath>"
    );
    process.exit(1);
  }

  const apiKey = process.argv[2];
  const menuId = process.argv[3];
  const filePath = process.argv[4];

  // Xác thực API key
  if (!apiKey || apiKey !== ADMIN_API_KEY) {
    console.error("Unauthorized: Invalid admin API key");
    process.exit(1);
  }

  try {
    // Read the file
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.join(process.cwd(), filePath);

    if (!fs.existsSync(absolutePath)) {
      console.error(`File not found: ${absolutePath}`);
      process.exit(1);
    }

    const fileContent = fs.readFileSync(absolutePath, "utf8");
    const menuDishes = JSON.parse(fileContent);

    if (!Array.isArray(menuDishes)) {
      console.error("Invalid file content: Expected an array of menu dishes");
      process.exit(1);
    }

    console.log(
      `Importing ${menuDishes.length} menu dishes for menu ID: ${menuId}`
    );

    // Import the menu dishes
    const result = await importMenuDishes(menuDishes, menuId);

    if (result.success) {
      console.log("Import successful!");
    } else {
      console.error("Import failed:", result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error("Error importing menu dishes:", error);
    process.exit(1);
  }
}

// Run the import function
importDishesFromFile().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
