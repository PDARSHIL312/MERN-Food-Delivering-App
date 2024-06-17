import React from "react";
import { Button } from "./ui/button";

export default function MainNav() {
  return (
    <div>
      <Button
        variant="ghost"
        className="font-bold hover:text-orange-500 hover:bg-white"
      >
        Log In
      </Button>
    </div>
  );
}
