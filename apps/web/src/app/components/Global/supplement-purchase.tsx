"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Checkbox } from "../ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import {
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  Star,
  Shield,
  Clock,
  Gift,
  Check,
  ExternalLink,
  Sun,
  Fish,
  Leaf,
  Dumbbell,
  Zap,
} from "lucide-react"
import type { ProtocolData, Supplement } from "./stack-lab-builder"

interface SupplementPurchaseProps {
  protocol: ProtocolData
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface PurchaseOption {
  id: string
  brand: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  shipping: "free" | "paid"
  shippingCost?: number
  shippingTime: string
  inStock: boolean
  verified: boolean
  discount?: number
  features: string[]
}

interface CartItem {
  supplement: Supplement
  option: PurchaseOption
  quantity: number
  selected: boolean
}

const getSupplementIcon = (iconName: string) => {
  const icons = {
    Sun,
    Fish,
    Zap: Zap,
    Leaf,
    Dumbbell,
  }
  const IconComponent = icons[iconName as keyof typeof icons] || Package
  return IconComponent
}

export function SupplementPurchase({ protocol, open, onOpenChange }: SupplementPurchaseProps) {
  const [selectedSupplements, setSelectedSupplements] = useState<string[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [deliveryOption, setDeliveryOption] = useState("standard")
  const [subscriptionEnabled, setSubscriptionEnabled] = useState(true)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  // Get all unique supplements from the protocol
  const allSupplements = protocol.timeSlots.reduce((acc, slot) => {
    slot.supplements.forEach((supplement) => {
      if (!acc.find((s) => s.name === supplement.name)) {
        acc.push(supplement)
      }
    })
    return acc
  }, [] as Supplement[])

  // Mock purchase options for each supplement
  const getPurchaseOptions = (supplement: Supplement): PurchaseOption[] => {
    const basePrice = supplement.price
    return [
      {
        id: `${supplement.id}-thorne`,
        brand: "Thorne Research",
        name: supplement.name,
        price: basePrice * 1.2,
        rating: 4.8,
        reviews: 1247,
        shipping: "free",
        shippingTime: "2-3 days",
        inStock: true,
        verified: true,
        features: ["Third-party tested", "NSF Certified", "Physician formulated"],
      },
      {
        id: `${supplement.id}-pure`,
        brand: "Pure Encapsulations",
        name: supplement.name,
        price: basePrice * 1.1,
        originalPrice: basePrice * 1.3,
        discount: 15,
        rating: 4.7,
        reviews: 892,
        shipping: "free",
        shippingTime: "3-5 days",
        inStock: true,
        verified: true,
        features: ["Hypoallergenic", "No artificial additives", "Research-based"],
      },
      {
        id: `${supplement.id}-now`,
        brand: "NOW Foods",
        name: supplement.name,
        price: basePrice * 0.8,
        rating: 4.5,
        reviews: 2156,
        shipping: "paid",
        shippingCost: 4.99,
        shippingTime: "5-7 days",
        inStock: true,
        verified: false,
        features: ["Family owned", "GMP certified", "Value pricing"],
      },
      {
        id: `${supplement.id}-jarrow`,
        brand: "Jarrow Formulas",
        name: supplement.name,
        price: basePrice * 0.95,
        rating: 4.6,
        reviews: 634,
        shipping: "free",
        shippingTime: "4-6 days",
        inStock: Math.random() > 0.2,
        verified: true,
        features: ["Superior science", "Smarter formulas", "Clinical research"],
      },
    ]
  }

  const initializeCart = () => {
    const cartItems: CartItem[] = []
    allSupplements.forEach((supplement) => {
      const options = getPurchaseOptions(supplement)
      const bestOption = options.find((opt) => opt.verified && opt.inStock) || options[0]
      cartItems.push({
        supplement,
        option: bestOption,
        quantity: 1,
        selected: true,
      })
    })
    setCart(cartItems)
    setSelectedSupplements(allSupplements.map((s) => s.id))
  }

  // Initialize cart when dialog opens
  useState(() => {
    if (open && cart.length === 0) {
      initializeCart()
    }
  })

  const updateCartItem = (supplementId: string, updates: Partial<CartItem>) => {
    setCart((prev) => prev.map((item) => (item.supplement.id === supplementId ? { ...item, ...updates } : item)))
  }

  const toggleSupplementSelection = (supplementId: string) => {
    const isSelected = selectedSupplements.includes(supplementId)
    if (isSelected) {
      setSelectedSupplements((prev) => prev.filter((id) => id !== supplementId))
      updateCartItem(supplementId, { selected: false })
    } else {
      setSelectedSupplements((prev) => [...prev, supplementId])
      updateCartItem(supplementId, { selected: true })
    }
  }

  const calculateSubtotal = () => {
    return cart
      .filter((item) => item.selected)
      .reduce((total, item) => {
        const price = subscriptionEnabled ? item.option.price * 0.9 : item.option.price
        return total + price * item.quantity
      }, 0)
  }

  const calculateShipping = () => {
    const selectedItems = cart.filter((item) => item.selected)
    const hasShippingCost = selectedItems.some((item) => item.option.shipping === "paid")
    return deliveryOption === "express" ? 9.99 : hasShippingCost ? 4.99 : 0
  }

  const calculateDiscount = () => {
    if (appliedPromo === "SILO15") return calculateSubtotal() * 0.15
    if (appliedPromo === "FIRST10") return calculateSubtotal() * 0.1
    return 0
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() - calculateDiscount()
  }

  const applyPromoCode = () => {
    if (promoCode === "SILO15" || promoCode === "FIRST10") {
      setAppliedPromo(promoCode)
    }
  }

  const selectedCount = cart.filter((item) => item.selected).length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <ShoppingCart className="w-5 h-5 text-green-600" />
            <span>Purchase Supplements</span>
          </DialogTitle>
          <DialogDescription>
            Buy the supplements from your protocol with verified brands and competitive pricing
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Supplement Selection */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Protocol Supplements</h3>
              <Badge variant="outline" className="text-sm">
                {selectedCount} of {allSupplements.length} selected
              </Badge>
            </div>

            <div className="space-y-4">
              {allSupplements.map((supplement) => {
                const cartItem = cart.find((item) => item.supplement.id === supplement.id)
                const options = getPurchaseOptions(supplement)
                const IconComponent = getSupplementIcon(supplement.icon)
                const isSelected = selectedSupplements.includes(supplement.id)

                return (
                  <Card key={supplement.id} className={`${isSelected ? "ring-2 ring-green-200" : ""}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSupplementSelection(supplement.id)}
                        />
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <IconComponent className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base">{supplement.name}</CardTitle>
                          <CardDescription>
                            {supplement.category} • {supplement.dosage}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    {isSelected && cartItem && (
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium">Choose Brand:</h4>
                          <RadioGroup
                            value={cartItem.option.id}
                            onValueChange={(value) => {
                              const newOption = options.find((opt) => opt.id === value)
                              if (newOption) {
                                updateCartItem(supplement.id, { option: newOption })
                              }
                            }}
                          >
                            {options.map((option) => (
                              <div key={option.id} className="flex items-center space-x-3">
                                <RadioGroupItem value={option.id} id={option.id} disabled={!option.inStock} />
                                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div>
                                        <div className="flex items-center space-x-2">
                                          <span className="font-medium">{option.brand}</span>
                                          {option.verified && <Shield className="w-4 h-4 text-green-600" />}
                                          {option.discount && (
                                            <Badge className="bg-red-100 text-red-800 text-xs">
                                              {option.discount}% OFF
                                            </Badge>
                                          )}
                                        </div>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                          <div className="flex items-center space-x-1">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span>{option.rating}</span>
                                            <span>({option.reviews})</span>
                                          </div>
                                          <div className="flex items-center space-x-1">
                                            <Truck className="w-3 h-3" />
                                            <span>{option.shippingTime}</span>
                                          </div>
                                          {!option.inStock && (
                                            <Badge variant="outline" className="text-red-600 border-red-200">
                                              Out of Stock
                                            </Badge>
                                          )}
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {option.features.slice(0, 2).map((feature) => (
                                            <Badge key={feature} variant="outline" className="text-xs">
                                              {feature}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="flex items-center space-x-2">
                                        {option.originalPrice && (
                                          <span className="text-sm text-gray-500 line-through">
                                            ${option.originalPrice.toFixed(2)}
                                          </span>
                                        )}
                                        <span className="font-semibold">${option.price.toFixed(2)}</span>
                                      </div>
                                      {option.shipping === "free" ? (
                                        <span className="text-xs text-green-600">Free shipping</span>
                                      ) : (
                                        <span className="text-xs text-gray-500">+${option.shippingCost} shipping</span>
                                      )}
                                    </div>
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Label htmlFor={`quantity-${supplement.id}`} className="text-sm font-medium">
                            Quantity:
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateCartItem(supplement.id, {
                                  quantity: Math.max(1, cartItem.quantity - 1),
                                })
                              }
                            >
                              -
                            </Button>
                            <Input
                              id={`quantity-${supplement.id}`}
                              type="number"
                              min="1"
                              value={cartItem.quantity}
                              onChange={(e) =>
                                updateCartItem(supplement.id, {
                                  quantity: Math.max(1, Number.parseInt(e.target.value) || 1),
                                })
                              }
                              className="w-16 text-center"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateCartItem(supplement.id, {
                                  quantity: cartItem.quantity + 1,
                                })
                              }
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Subscription Option */}
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Checkbox
                    id="subscription"
                    checked={subscriptionEnabled}
                    onCheckedChange={(checked) => setSubscriptionEnabled(checked === true)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="subscription" className="font-medium text-green-800">
                      Subscribe & Save 10%
                    </Label>
                    <p className="text-xs text-green-700">Delivered monthly, cancel anytime</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">10% OFF</Badge>
                </div>

                {/* Delivery Options */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Delivery Options</h4>
                  <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="flex justify-between">
                          <span>Standard (5-7 days)</span>
                          <span className="text-green-600">Free</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="flex justify-between">
                          <span>Express (2-3 days)</span>
                          <span>$9.99</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Promo Code */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Promo Code</h4>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      disabled={!!appliedPromo}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={applyPromoCode}
                      disabled={!promoCode || !!appliedPromo}
                    >
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="flex items-center space-x-2 mt-2 text-green-600">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">Code {appliedPromo} applied!</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({selectedCount} items)</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  {subscriptionEnabled && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Subscription discount (10%)</span>
                      <span>-${(calculateSubtotal() * 0.1).toFixed(2)}</span>
                    </div>
                  )}
                  {appliedPromo && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Promo discount ({appliedPromo})</span>
                      <span>-${calculateDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{calculateShipping() === 0 ? "Free" : `$${calculateShipping().toFixed(2)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>Cancel subscription anytime</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg" disabled={selectedCount === 0}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </CardFooter>
            </Card>

            {/* Savings Summary */}
            {(subscriptionEnabled || appliedPromo) && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Gift className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">You're saving!</span>
                  </div>
                  <div className="space-y-1 text-sm text-green-700">
                    {subscriptionEnabled && <div>• 10% off with subscription</div>}
                    {appliedPromo && <div>• {appliedPromo === "SILO15" ? "15%" : "10%"} off with promo code</div>}
                    <div className="font-medium">
                      Total savings: ${(calculateSubtotal() * 0.1 + calculateDiscount()).toFixed(2)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Continue Building
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
