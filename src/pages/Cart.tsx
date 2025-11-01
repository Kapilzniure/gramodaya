import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart }from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Minus, Plus, Trash2, ShoppingBag, Tag } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, cartTotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [qrMissing, setQrMissing] = useState(false);

  const applyCoupon = () => {
    const validCoupons: Record<string, number> = {
      'SPIN10': 10,
      'WELCOME5': 5,
      'SAVE15': 15,
    };

    const discountPercent = validCoupons[couponCode.toUpperCase()];
    
    if (discountPercent) {
      setDiscount(discountPercent);
      toast.success(`Coupon applied! ${discountPercent}% off`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const finalTotal = cartTotal - (cartTotal * discount / 100);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">
          Start shopping to add items to your cart
        </p>
        <Link to="/products">
          <Button variant="hero" size="lg">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-lg font-bold text-primary mb-4">
                        NPR {item.price.toLocaleString()}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            removeItem(item.productId);
                            toast.success("Item removed from cart");
                          }}
                        >
                          <Trash2 className="h-5 w-5 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">NPR {cartTotal.toLocaleString()}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount ({discount}%)</span>
                  <span>-NPR {((cartTotal * discount) / 100).toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span className="text-primary">NPR {finalTotal.toLocaleString()}</span>
            </div>

            {/* Coupon */}
            <div className="space-y-3 mb-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button variant="outline" onClick={applyCoupon}>
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Try: SPIN10, WELCOME5, SAVE15
              </p>
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full mb-4"
              onClick={() => setCheckoutOpen(true)}
            >
              Checkout
            </Button>

            <Button
              variant="outline"
              className="w-full"
              asChild
            >
              <Link to="/products">Continue Shopping</Link>
            </Button>
            {/* Checkout Dialog */}
            <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Pay with eSewa</DialogTitle>
                  <DialogDescription>
                    Scan the QR code below in your eSewa app to pay. After payment, click "I Paid" to confirm and place the order.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-4 py-4">
                  {!qrMissing ? (
                    <img
                      src="/esewa-qr.jpg"
                      alt="eSewa QR"
                      className="w-48 h-48 object-cover rounded-md shadow-md"
                      onError={() => setQrMissing(true)}
                    />
                  ) : (
                    <div className="text-center text-sm text-muted-foreground">
                      eSewa QR not found. Please copy your QR image to the project's <code>public</code> folder as <code>esewa-qr.jpg</code> (see instructions below) or contact the seller for payment details.
                    </div>
                  )}

                  <div className="text-center text-xs text-muted-foreground">
                    Please place the QR image in the public folder to enable payments.
                  </div>
                </div>

                <DialogFooter>
                  <div className="flex w-full gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setCheckoutOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="hero"
                      className="flex-1"
                      onClick={() => {
                        if (qrMissing) {
                          toast.error("QR not available — cannot confirm payment here.");
                          return;
                        }
                        toast.success("Order placed successfully!");
                        clearCart();
                        setCheckoutOpen(false);
                      }}
                    >
                      I Paid
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
