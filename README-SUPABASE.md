# Supabase Integration Guide

This document provides instructions for setting up Supabase as the backend for the Team Meal Ordering application.

## Setup Steps

### 1. Create a Supabase Project

1. Sign up or log in to [Supabase](https://supabase.io)
2. Create a new project
3. Note your project URL and anon key, which will be used in environment variables

### 2. Setup Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Admin API Key (for CLI import tool)
ADMIN_API_KEY=choose_a_secure_api_key_here
```

Replace the placeholder values with your actual Supabase project credentials.

### 3. Set Up Database Tables

Execute the following SQL in your Supabase SQL editor to create the necessary tables:

```sql
-- Create tables for categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create dishes table
CREATE TABLE IF NOT EXISTS dishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  position INTEGER DEFAULT 0,
  image_url TEXT,
  category_id UUID REFERENCES categories(id),
  description TEXT DEFAULT '',
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create menus table
CREATE TABLE IF NOT EXISTS menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create menu_dishes (junction table)
CREATE TABLE IF NOT EXISTS menu_dishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_id UUID REFERENCES menus(id) ON DELETE CASCADE,
  dish_id UUID REFERENCES dishes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(menu_id, dish_id)
);

-- Create RLS policies (adjust as needed for your authentication setup)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_dishes ENABLE ROW LEVEL SECURITY;

-- Create policies that allow all authenticated users to view data
CREATE POLICY "Allow all users to view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow all users to view dishes" ON dishes FOR SELECT USING (true);
CREATE POLICY "Allow all users to view menus" ON menus FOR SELECT USING (true);
CREATE POLICY "Allow all users to view menu_dishes" ON menu_dishes FOR SELECT USING (true);

-- Create policies that allow admin roles to modify data (adjust based on your auth setup)
-- Example for an admin role-based policy:
-- CREATE POLICY "Allow admins to modify categories" ON categories FOR ALL USING (auth.role() = 'admin');
```

## Admin Access Configuration

The application has admin-only features that are protected by authentication. To set up admin access:

1. Edit the `lib/auth.ts` file and add the email addresses of your admin users to the `ADMIN_EMAILS` array:

```typescript
const ADMIN_EMAILS = [
  "admin@example.com",
  "your_admin_email@example.com",
  // Add more admin emails here
];
```

2. For the CLI import tool, set a secure `ADMIN_API_KEY` in your `.env.local` file:

```
ADMIN_API_KEY=choose_a_secure_api_key_here
```

3. Update the script in package.json to use this key:

```json
"import-menu-dishes": "cross-env ADMIN_API_KEY=your_admin_api_key_here ts-node scripts/import-menu-dishes.ts"
```

## Importing Menu Dishes

### Web UI (Admin Only)

To import menu dishes using the web interface:

1. Sign in with an admin account (email must be in the `ADMIN_EMAILS` array)
2. Navigate to `/admin/import`
3. Enter the menu ID and paste the JSON data
4. Click "Import Menu Dishes"

### Command Line (Admin Only)

To import using the command line:

```bash
# Using npm script (requires admin API key in .env.local)
npm run import-menu-dishes -- your_api_key your_menu_id path/to/data.json

# Or directly with ts-node
ts-node scripts/import-menu-dishes.ts your_api_key your_menu_id path/to/data.json
```

The import function will:

1. Delete all existing dishes for the specified menu
2. Insert the new dishes from the JSON data

## API Usage Examples

### Get Menu Dishes

```typescript
import { getMenuDishes } from "@/lib/supabase";

// In an async function:
const menuId = "0296d2d4-b0b6-4c56-95f7-587b661bbb6b";
const menuDishes = await getMenuDishes(menuId);
```

### Import Menu Dishes Programmatically (Admin Only)

```typescript
import { importMenuDishes } from "@/lib/supabase";

// In an async function:
const menuId = "0296d2d4-b0b6-4c56-95f7-587b661bbb6b";
const menuDishes = [
  /* your array of menu dishes */
];
const result = await importMenuDishes(menuDishes, menuId);
```
