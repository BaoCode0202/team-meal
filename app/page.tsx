"use client";

import Link from "next/link";
import { MoveRight, Utensils, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="Delicious food background"
              className="w-full h-full object-cover brightness-50"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full py-20 md:py-32 lg:py-40">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="max-w-3xl mx-auto text-center text-white">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
                  Đặt cơm dễ dàng cho team của bạn
                </h1>
                <p className="mx-auto max-w-[700px] text-lg md:text-xl mb-8 text-gray-200">
                  Giải pháp đặt cơm hiệu quả, tiết kiệm thời gian và đảm bảo bữa
                  ăn chất lượng cho cả đội nhóm.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/menu">
                    <Button
                      size="lg"
                      className="bg-rose-600 hover:bg-rose-700 text-white"
                    >
                      Xem thực đơn hôm nay
                      <MoveRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
                    >
                      Đăng nhập
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Cách thức hoạt động
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
                Đặt cơm cho team chưa bao giờ dễ dàng đến thế
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                  <Utensils className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Chọn món ăn</h3>
                <p className="text-gray-500">
                  Duyệt qua thực đơn đa dạng và chọn món ăn yêu thích của bạn
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Đặt cho cả team</h3>
                <p className="text-gray-500">
                  Dễ dàng đặt nhiều món cho cả đội nhóm trong một lần
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Giao hàng đúng giờ</h3>
                <p className="text-gray-500">
                  Nhận đồ ăn tươi ngon, nóng hổi đúng giờ tại văn phòng
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Meals */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Món ăn nổi bật
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
                Những món ăn được yêu thích nhất trong tuần này
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured Meal 1 */}
              <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Cơm gà xối mỡ"
                  className="w-full h-60 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">Cơm gà xối mỡ</h3>
                  <p className="text-sm text-gray-200 mb-3">
                    Cơm gà xối mỡ đặc biệt, ăn kèm rau và nước mắm chua ngọt
                  </p>
                  <p className="font-bold text-rose-300">45.000₫</p>
                </div>
              </div>

              {/* Featured Meal 2 */}
              <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Bún chả Hà Nội"
                  className="w-full h-60 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">Bún chả Hà Nội</h3>
                  <p className="text-sm text-gray-200 mb-3">
                    Bún chả truyền thống Hà Nội với nước mắm, rau sống và nem
                  </p>
                  <p className="font-bold text-rose-300">55.000₫</p>
                </div>
              </div>

              {/* Featured Meal 3 */}
              <div className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Phở bò tái lăn"
                  className="w-full h-60 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">Phở bò tái lăn</h3>
                  <p className="text-sm text-gray-200 mb-3">
                    Phở bò với thịt bò tươi ngon, hành ngò và các gia vị đặc
                    trưng
                  </p>
                  <p className="font-bold text-rose-300">60.000₫</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link href="/menu">
                <Button className="bg-rose-600 hover:bg-rose-700">
                  Xem tất cả món ăn
                  <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="w-full py-12 md:py-24 bg-rose-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Team lunch"
                  className="rounded-lg shadow-lg object-cover w-full h-[400px]"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Tại sao chọn TeamMeals?
                </h2>
                <p className="text-gray-500 md:text-lg/relaxed">
                  Chúng tôi cung cấp giải pháp đặt cơm toàn diện cho doanh
                  nghiệp và đội nhóm của bạn.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="h-4 w-4 text-rose-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Tiết kiệm thời gian</h3>
                      <p className="text-sm text-gray-500">
                        Không cần mất thời gian đi lại hoặc chờ đợi, tập trung
                        vào công việc
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="h-4 w-4 text-rose-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Đa dạng lựa chọn</h3>
                      <p className="text-sm text-gray-500">
                        Thực đơn phong phú từ nhiều nhà hàng uy tín, phù hợp mọi
                        khẩu vị
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="h-4 w-4 text-rose-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Thanh toán linh hoạt</h3>
                      <p className="text-sm text-gray-500">
                        Nhiều phương thức thanh toán, dễ dàng quản lý chi phí ăn
                        uống
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="h-4 w-4 text-rose-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Giao hàng đúng hẹn</h3>
                      <p className="text-sm text-gray-500">
                        Cam kết giao hàng đúng giờ, đảm bảo bữa ăn nóng hổi
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Khách hàng nói gì về chúng tôi
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
                Trải nghiệm từ các doanh nghiệp đã sử dụng dịch vụ của TeamMeals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-bold">Nguyễn Văn A</h4>
                    <p className="text-sm text-gray-500">
                      Giám đốc Công ty ABC
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "TeamMeals đã giúp chúng tôi tiết kiệm rất nhiều thời gian
                  trong việc đặt cơm cho nhân viên. Thực đơn đa dạng và chất
                  lượng món ăn rất tốt."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-bold">Trần Thị B</h4>
                    <p className="text-sm text-gray-500">Quản lý nhân sự XYZ</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Hệ thống đặt cơm rất dễ sử dụng, thanh toán đơn giản và giao
                  hàng luôn đúng giờ. Nhân viên của chúng tôi rất hài lòng với
                  dịch vụ."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-bold">Lê Văn C</h4>
                    <p className="text-sm text-gray-500">Startup DEF</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "TeamMeals là giải pháp hoàn hảo cho startup như chúng tôi.
                  Giá cả hợp lý, món ăn ngon và đội ngũ hỗ trợ rất nhiệt tình."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 bg-rose-600 text-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Sẵn sàng đặt cơm cho team của bạn?
            </h2>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl mb-8 text-rose-100">
              Đăng ký ngay hôm nay để trải nghiệm dịch vụ đặt cơm chuyên nghiệp
              cho doanh nghiệp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu">
                <Button
                  size="lg"
                  className="bg-white text-rose-600 hover:bg-rose-50"
                >
                  Bắt đầu đặt món
                  <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-rose-700"
                >
                  Tìm hiểu thêm
                </Button>
              </Link>
            </div>
          </div>
        </section>
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
