import { supabase, MenuDish } from "./supabase";

/**
 * Service for fetching and managing menu and dishes
 */
export const MenuService = {
  /**
   * Get active menu with dishes
   */
  async getActiveMenu() {
    // Get the active menu
    const { data: menus, error: menuError } = await supabase
      .from("menus")
      .select("*")
      .eq("is_active", true)
      .order("date", { ascending: false })
      .limit(1);

    if (menuError) {
      throw menuError;
    }

    if (!menus || menus.length === 0) {
      return null;
    }

    const activeMenu = menus[0];

    // Get the dishes for this menu
    const { data: menuDishes, error: dishesError } = await supabase
      .from("menu_dishes")
      .select(
        `
        id,
        menu_id,
        dish_id,
        dish:dishes (
          id,
          name,
          price,
          position,
          image_url,
          category_id,
          description,
          is_available
        )
      `
      )
      .eq("menu_id", activeMenu.id);

    if (dishesError) {
      throw dishesError;
    }

    return {
      ...activeMenu,
      dishes: menuDishes,
    };
  },

  /**
   * Get menu dishes by menu ID
   */
  async getMenuDishes(menuId: string) {
    const { data, error } = await supabase
      .from("menu_dishes")
      .select(
        `
        id,
        menu_id,
        dish_id,
        dish:dishes (
          id,
          name,
          price,
          position,
          image_url,
          category_id,
          description,
          is_available
        )
      `
      )
      .eq("menu_id", menuId);

    if (error) {
      throw error;
    }

    return data;
  },

  /**
   * Get dishes by category ID
   */
  async getDishesByCategory(categoryId: string) {
    const { data, error } = await supabase
      .from("dishes")
      .select("*")
      .eq("category_id", categoryId)
      .order("position", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      throw error;
    }

    return data;
  },

  /**
   * Get all categories
   */
  async getCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      throw error;
    }

    return data;
  },

  /**
   * Import menu dishes (for admin use)
   */
  async importMenuDishes(menuId: string, menuDishes: MenuDish[]) {
    try {
      // Delete existing menu dishes for this menu
      const { error: deleteError } = await supabase
        .from("menu_dishes")
        .delete()
        .eq("menu_id", menuId);

      if (deleteError) {
        throw deleteError;
      }

      // Insert new menu dishes
      const { data, error } = await supabase
        .from("menu_dishes")
        .insert(menuDishes)
        .select();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      console.error("Error importing menu dishes:", error);
      return { success: false, error };
    }
  },
};
