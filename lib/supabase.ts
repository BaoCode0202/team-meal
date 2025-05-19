import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Dish and menu types
export type Dish = {
  name: string;
  price: number;
  position: number;
  image_url: string;
  category_id: string;
  description: string;
  is_available: boolean;
};

export type MenuDish = {
  id: string;
  menu_id: string;
  dish_id: string;
  dish: Dish;
};

// Function to import menu dishes
export async function importMenuDishes(menuDishes: MenuDish[], menuId: string) {
  try {
    console.log("Starting Supabase import...");
    console.log("Supabase URL:", supabaseUrl);
    console.log("Menu ID:", menuId);
    console.log("Number of dishes:", menuDishes.length);

    // First delete existing menu dishes for this menu
    console.log("Deleting existing menu dishes...");
    const { error: deleteError } = await supabase
      .from("menu_dishes")
      .delete()
      .eq("menu_id", menuId);

    if (deleteError) {
      console.error("Error deleting existing dishes:", deleteError);
      throw deleteError;
    }

    // Then insert the new menu dishes
    console.log("Inserting new menu dishes...");
    const { data, error } = await supabase
      .from("menu_dishes")
      .insert(menuDishes)
      .select();

    if (error) {
      console.error("Error inserting new dishes:", error);
      throw error;
    }

    console.log("Import successful!");
    return { success: true, data };
  } catch (error) {
    console.error("Error in importMenuDishes:", error);
    return { success: false, error };
  }
}

// Function to get menu dishes by menu ID
export async function getMenuDishes(menuId: string) {
  const { data, error } = await supabase
    .from("menu_dishes")
    .select("*, dish:dish_id(*)")
    .eq("menu_id", menuId);

  if (error) {
    throw error;
  }

  return data;
}
