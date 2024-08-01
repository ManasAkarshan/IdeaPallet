"use client";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import UsageTrack from "./UsageTrack";
import Link from "next/link";

function Sidenav() {
  const MenuList = [
    { name: "Home", icon: Home, path: "/dashboard" },
    { name: "History", icon: FileClock, path: "/dashboard/history" },
    { name: "Billing", icon: WalletCards, path: "/dashboard/billing" },
    { name: "Setting", icon: Settings, path: "/dashboard/setting" },
  ];

  const path = usePathname();

  return (
    <div className="sm:h-full sm:min-h-screen sm:p-4 p-2 max-sm:py-3 shadow-sm border max-sm:pb-1 ">
      <div>
        <div className="flex justify-center items-center  gap-2">
          <img src="/logo.png" width={30}></img>
          <h2 className="text-3xl max-sm:text-2xl font-bold text-center ">
            IdeaPallet
          </h2>
        </div>
        
        <hr className="my-3 border" />
        <div className="max-sm:flex max-sm:justify-between">
          {MenuList.map((item, index) => (
            <Link href={item.path} key={index + " " + item.path}>
              <div
                className={`flex text-primary text-sc items-center gap-2 max-sm:gap-1 p-2 sm:mb-3 hover:bg-secondary rounded-md cursor-pointer ${
                  path === item.path && "bg-secondary "
                }`}
              >
                <item.icon />
                <h2 className="max-sm:text-sm">{item.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="sm:mb-10 mt-4">
        <UsageTrack />
      </div>
    </div>
  );
}

export default Sidenav;
