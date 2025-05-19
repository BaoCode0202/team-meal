"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, CircleDashed, Check, Wallet } from "lucide-react"

interface PaymentFormProps {
  total: number
  onComplete: () => void
}

export default function PaymentForm({ total, onComplete }: PaymentFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState("credit")
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState(1)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setStep(2)

      // After showing success, navigate to orders page
      setTimeout(() => {
        toast({
          title: "Thanh toán thành công!",
          description: "Đơn hàng của bạn đã được xác nhận.",
        })
        onComplete()
        router.push("/orders")
      }, 2000)
    }, 2000)
  }

  return (
    <div>
      {step === 1 ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>Phương thức thanh toán</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-2 border rounded-md p-4">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CreditCard className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Thẻ tín dụng/ghi nợ</p>
                    <p className="text-sm text-zinc-500">Thanh toán an toàn qua cổng thanh toán</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-4">
                <RadioGroupItem value="momo" id="momo" />
                <Label htmlFor="momo" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Wallet className="h-5 w-5 text-pink-500" />
                  <div>
                    <p className="font-medium">Ví MoMo</p>
                    <p className="text-sm text-zinc-500">Thanh toán qua ví điện tử MoMo</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-4">
                <RadioGroupItem value="banking" id="banking" />
                <Label htmlFor="banking" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CreditCard className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Chuyển khoản ngân hàng</p>
                    <p className="text-sm text-zinc-500">Thanh toán qua Internet Banking</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "credit" && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="cardName">Tên trên thẻ</Label>
                <Input id="cardName" placeholder="Nguyen Van A" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cardNumber">Số thẻ</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Ngày hết hạn</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "momo" && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Số điện thoại MoMo</Label>
                <Input id="phoneNumber" placeholder="0901234567" required />
              </div>
            </div>
          )}

          {paymentMethod === "banking" && (
            <div className="space-y-4 border p-4 rounded-md bg-zinc-50">
              <p className="font-medium">Thông tin chuyển khoản:</p>
              <div className="space-y-1 text-sm">
                <p>
                  Ngân hàng: <span className="font-medium">BIDV</span>
                </p>
                <p>
                  Số tài khoản: <span className="font-medium">1234567890</span>
                </p>
                <p>
                  Tên tài khoản: <span className="font-medium">CONG TY TNHH TEAM MEALS</span>
                </p>
                <p>
                  Nội dung: <span className="font-medium">TEAMMEALS [SDT]</span>
                </p>
              </div>
              <p className="text-sm text-zinc-500 mt-2">Vui lòng upload biên lai sau khi chuyển khoản</p>
              <div className="grid gap-2">
                <Label htmlFor="receipt">Biên lai chuyển khoản</Label>
                <Input id="receipt" type="file" required />
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex justify-between font-bold mb-4">
              <span>Tổng thanh toán</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <CircleDashed className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                `Thanh toán ${formatPrice(total)}`
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Thanh toán thành công!</h3>
          <p className="text-zinc-500 mb-6">Đơn hàng của bạn đã được xác nhận và đang được xử lý.</p>
          <p className="font-medium mb-1">Mã đơn hàng</p>
          <p className="text-zinc-700 font-bold mb-6">
            ORD
            {Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, "0")}
          </p>
        </div>
      )}
    </div>
  )
}
