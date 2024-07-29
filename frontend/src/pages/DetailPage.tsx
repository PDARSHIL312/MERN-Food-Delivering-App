import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType } from "@/types";

export type CardItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function DetailPage() {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const [cardItems, setCardItems] = useState<CardItem[]>([]);

  const addToCart = (menuItem: MenuItemType) => {
    setCardItems((prevCartItems) => {
      // 1. Check IF the Item Is already exist or not
      const existingCartItem = prevCartItems.find(
        (cardItem) => cardItem._id === menuItem._id
      );

      let updateCardItems;

      if (existingCartItem) {
        updateCardItems = prevCartItems.map((cardItem) =>
          cardItem._id === menuItem._id
            ? { ...cardItem, quantity: cardItem.quantity + 1 }
            : cardItem
        );
      } else {
        updateCardItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      return updateCardItems;
    });
  };

  const removeFromCart = (cardItem: CardItem) => {
    setCardItems((prevCartItems) => {
      const updateCardItems = prevCartItems.filter(
        (items) => cardItem._id !== items._id
      );

      return updateCardItems;
    });
  };

  if (isLoading || !restaurant) {
    return "Loading...";
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.lastUpdated}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cardItems={cardItems}
              removeFromCart={removeFromCart}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
