
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="p-3 shadow-sm border-b-2 flex justify-between items-center">
        <UserButton/>
        <ModeToggle/>
        
    </div>
  );
}

export default Header;
