import { currentUser } from "@clerk/nextjs/server";

// Danh sách email admin (có thể chuyển sang cấu hình môi trường sau)
const ADMIN_EMAILS = [
  "admin@example.com",
  "devbaopham222000@gmail.com", // Thay thế bằng email của bạn
  // Thêm các email admin khác vào đây
];

/**
 * Kiểm tra xem người dùng hiện tại có phải là admin không
 * @returns true nếu người dùng là admin, false nếu không phải
 */
export async function isAdmin(): Promise<boolean> {
  const user = await currentUser();

  // Nếu không có người dùng, không phải admin
  if (!user) return false;

  // Kiểm tra danh sách email
  const userEmail = user.emailAddresses
    .find((email: any) => email.id === user.primaryEmailAddressId)
    ?.emailAddress.toLowerCase();

  if (!userEmail) return false;

  return ADMIN_EMAILS.includes(userEmail);
}

/**
 * Middleware để bảo vệ các route chỉ dành cho admin
 * Sử dụng trong Next.js API Routes
 */
export async function adminOnly(handler: Function) {
  return async (req: Request) => {
    const isUserAdmin = await isAdmin();

    if (!isUserAdmin) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized: Admin access required",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return handler(req);
  };
}
