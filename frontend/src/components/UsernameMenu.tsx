import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CircleUserRound } from "lucide-react";

export default function UsernameMenu() {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 py-2 font-bold text-gray-700 hover:text-orange-500 gap-4">
        <CircleUserRound className="text-orange-500" />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white rounded shadow-md overflow-hidden mt-2">
        {/* Visible Separator with Tailwind classes */}
        <Separator className="border-t border-gray-200" />
        <DropdownMenuItem className="px-4 py-2 hover:text-orange-500">
          <Link to="/manage-restaurant" className="font-bold">
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <Separator className="border-t border-gray-200" />
        <DropdownMenuItem className="px-4 py-2 hover:text-orange-500">
          <Link to="/user-profile" className="font-bold">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator className="border-t border-gray-200" />
        <DropdownMenuItem className="px-4 py-2 hover:text-orange-500">
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold text-white bg-orange-500 hover:bg-orange-600"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
