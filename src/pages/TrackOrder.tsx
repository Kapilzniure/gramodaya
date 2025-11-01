import { useLocation, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Package, Truck, Home } from "lucide-react";

interface OrderItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface OrderData {
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  coupon: string | null;
}

type Step = {
  label: string;
  subText: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  {
    label: "Pending",
    subText: "Your order has been received",
    icon: <Circle className="h-5 w-5" />,
  },
  {
    label: "Shipping",
    subText: "Your package is being prepared",
    icon: <Package className="h-5 w-5" />,
  },
  {
    label: "Moved",
    subText: "On the way to you",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    label: "Delivered",
    subText: "Enjoy your purchase!",
    icon: <Home className="h-5 w-5" />,
  },
];

const TrackOrder = () => {
  const { state } = useLocation();
  const order: OrderData = state as OrderData;

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">No order data found</h2>
        <Link to="/cart">
          <Button>Back to Cart</Button>
        </Link>
      </div>
    );
  }

  const currentStepIndex = 0; // Hard-coded to "Pending" for the demo

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>

      {/* Progress steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          {steps.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;

            return (
              <div key={idx} className="flex-1 relative flex flex-col items-center">
                {/* Line between steps */}
                {idx !== 0 && (
                  <div
                    className={`absolute top-6 left-0 w-full h-0.5 -z-10 ${
                      isCompleted ? "bg-primary" : "bg-muted"
                    }`}
                    style={{ marginLeft: "-50%" }}
                  />
                )}

                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isCompleted
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : step.icon}
                </div>

                <div className="mt-3 text-center">
                  <p className={`font-semibold ${isActive ? "text-primary" : ""}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.subText}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order summary */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.productId} className="flex gap-4 items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  Qty: {item.quantity} × NPR {item.price.toLocaleString()}
                </p>
              </div>
              <p className="font-semibold">
                NPR {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}

          {/* <Separator className="my-4" /> */}

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>NPR {order.subtotal.toLocaleString()}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-success">
              <span>Discount ({order.discount}%)</span>
              <span>
                -NPR {((order.subtotal * order.discount) / 100).toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">
              NPR {order.total.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>

      <div className="flex justify-center">
        <Link to="/products">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default TrackOrder;
