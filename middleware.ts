import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/menu(.*)",
  "/cart(.*)",
  "/login(.*)",
  "/signup(.*)",
]);

// Define admin routes that require special permissions
const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
  // Không bao gồm API endpoint kiểm tra admin
  // vì API này cần được sử dụng để kiểm tra quyền admin
  "!/api/admin/check(.*)",
]);

// Define API routes that need authentication but not admin check
const isAuthApiRoute = createRouteMatcher(["/api/menu/dishes/import(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Only protect routes that are not public
  if (!isPublicRoute(req)) {
    // Kiểm tra xác thực cơ bản cho tất cả các route không công khai
    await auth.protect();

    // Đối với Admin routes, sẽ được bảo vệ bởi API middleware
    // hoặc client-side middleware, không xử lý ở đây
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
