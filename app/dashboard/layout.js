"use client"
import React, {useState} from "react";
import Sidenav from "./_components/Sidenav";
import Header from "./_components/Header";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { UserSubscriptionContext } from "../(context)/UserSubscriptionContext";

function DashboardLayout({ children }) {
    const [totalUsage, setTotalUsage] = useState(0)
    const [currUserSubscription, setCurrUserSubscription] = useState(false)
  return (
    <TotalUsageContext.Provider value={{totalUsage, setTotalUsage}}>
      <UserSubscriptionContext.Provider value={{currUserSubscription, setCurrUserSubscription}}>
      <div className="flex max-sm:flex-col">
        <div className="md:basis-1/5 max-sm:basis-0">
          <Sidenav />
        </div>
        <div className="flex-1">
          <Header />
          {children}
        </div>
      </div>
      </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  );
}

export default DashboardLayout;
