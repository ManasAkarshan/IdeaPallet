"use client";
import React, {useState, useContext} from "react";
import FormSection from "../_components/FormSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CloudLightning } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/app/utils/AiModel"; 
import { db } from "@/app/utils/db";
import { AIOutput, userSubscription } from "@/app/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
const OutputSection = dynamic(() => import('../_components/OutputSection'), {
  ssr: false
});
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";


function CreateNewContent({ params }) {
  const selectedTemplate = Templates?.find(
    (template) => template.slug === params["slug"]
  );
  const  [loading, setLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState("")
  const user = useUser();
  const {totalUsage,setTotalUsage} = useContext(TotalUsageContext);
  const router = useRouter();
  const {currUserSubscription, setCurrUserSubscription} =  useContext(UserSubscriptionContext)


  const GenerateAIContent = async (formData) => {
    if(totalUsage>10000 && !currUserSubscription){
      router.push('/billing')
      return;
    }
    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt
    const finalAIPrompt = JSON.stringify(formData) +", " + selectedPrompt;
    
    const result = await chatSession.sendMessage(finalAIPrompt);
    
    setAiOutput(result?.response.text());
    await saveInDB(formData, selectedTemplate.slug, result?.response.text());
    setLoading(false)
  };

  const saveInDB = async (formData, slug, aiOutput)=>{
    const result = await db.insert(AIOutput).values({
      formData: formData,
      slug: slug,
      aiResponse: aiOutput,
      createdBy: user.user?.primaryEmailAddress.emailAddress,
      createdAt: moment().format("DD/MM/YYYY")
    })
    console.log(result);
  }

  return (
    <div className='p-8'>
      <Link href={'/dashboard'}>
        <Button className='mb-3'><ArrowLeft/> Back</Button>
      </Link>
      <div className="grid md:grid-cols-2 grid-cols-1  gap-10">
        {/* Form */}
        <FormSection
          selectedTemplate={selectedTemplate}
          UserFormInput={(v) => GenerateAIContent(v)}
          loading={loading}
        />

        {/* output */}
        <OutputSection aiOutput={aiOutput}/>
      </div>
    </div>
  );
}

export default CreateNewContent;
