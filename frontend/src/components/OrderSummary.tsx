import { Restaurant } from "@/types";
import React from "react";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { CardItem } from "@/pages/DetailPage";
import { Separator } from "@radix-ui/react-separator";
import { Badge } from "./ui/badge";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cardItems: CardItem[];
  removeFromCart: (CardItem: CardItem) => void;
};

export default function OrderSummary({
  restaurant,
  cardItems,
  removeFromCart,
}: Props) {
  const getTotalCost = () => {
    const totalInPence = cardItems.reduce(
      (Acctotal, cardItem) => Acctotal + cardItem.price * cardItem.quantity,
      0
    );

    const toatalWithDelivery = totalInPence + restaurant.deliveryPrice;

    return (toatalWithDelivery / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>£{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cardItems.map((item) => (
          <div className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
              £{((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>£{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
}
