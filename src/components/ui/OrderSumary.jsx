import React from "react";
import OrderItem from "./OrderItem";
import OrderTotal from "./OrderTotal";
import {Button} from "./button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "./card";
import { useThemeStore } from "@/store/useThemeStore";


const OrderSummary = ({ items }) => {
  const theme = useThemeStore((state) => state.theme);
  return (
    <Card className="w-full md:w-80 h-fit" style={theme === "light" ? { backgroundColor: "#fff", color: "#000" } : { backgroundColor: "#333", color: "#fff" }} >
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Your cart is empty
          </p>
        ) : (
          items.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))
        )}

        <OrderTotal items={items} />
        <Button          
        variant="lg"
          className="w-full bg-cyan-500 text-white h-15 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 disabled:pointer-events-none "
        >
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;