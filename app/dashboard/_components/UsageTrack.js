"use client";
import { db } from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import { AIOutput } from "@/app/utils/schema";
import { eq } from "drizzle-orm";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { userSubscription } from "@/app/utils/schema";
import { useRouter } from "next/navigation";

function UsageTrack() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [credits, setCredits] = useState(0)
  const { user } = useUser();
  const {totalUsage,setTotalUsage} = useContext(TotalUsageContext);
  const {currUserSubscription, setCurrUserSubscription} =  useContext(UserSubscriptionContext)
  const [maxWord, setMaxWord] = useState(10000)
  const router = useRouter();

  useEffect(() => {
    const fetchAIOutput = async () => {
      try {
        const results = await db
          .select()
          .from(AIOutput)
          .where(eq(AIOutput.createdBy, user?.emailAddresses[0].emailAddress))
          .execute();
        setData(results);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };
    fetchAIOutput();
  }, [user, data]);

  useEffect(()=>{
    const getTotalUsage = ()=>{
      let total=0
      data.forEach((ele)=>{
        total += ele.aiResponse.length
      })
      setCredits(total)
    }
    getTotalUsage()
  }, [data])

  useEffect(() => {
    user && IsUserSubscriber()
  }, [user])
  

  const IsUserSubscriber = async()=>{
    const result = await db.select().from(userSubscription).where(eq(userSubscription.email, user?.emailAddresses[0].emailAddress));
    if(result.length > 0){
      setCurrUserSubscription(true);
      setMaxWord(100000)
    }
  }
  
  return (
    <div>
      <div className="bg-secondary text-primary rounded-lg p-3 max-sm:p-2 max-sm:px-3">
        <h2>Credits</h2>
        <div className="h-2 w-full rounded-full mt-3 bg-primary ">
          <div
            className="h-2 rounded-full bg-red-600 "
            style={{ width: `${(credits/maxWord)*100}%`}}
          ></div>
        </div>
        <h2 className="text-sm my-2 max-sm:my-0">{`${credits}/${currUserSubscription ? '1,00,000' : '10,000'} credits used`}</h2>
      </div>
      <Button onClick={()=>router.push('/dashboard/billing')} disabled={currUserSubscription} className="w-full my-3">{currUserSubscription ? 'Active plan' : 'Upgrade'}</Button>
    </div>
  );
}

export default UsageTrack;
