"use client"
import { Button } from '@/components/ui/button'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import Razorpay from 'razorpay'
import { Loader, Loader2Icon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/app/utils/db'
import { userSubscription } from '@/app/utils/schema'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import Script from 'next/script'

function Billing() {
  const [loading, setLoading] = useState(false)
  const {user} = useUser()
  const {currUserSubscription, setCurrUserSubscription} =  useContext(UserSubscriptionContext)
  
  const CreateSubscription = async () =>{
    setLoading(true)
    axios.post('/api/create-subscription').then((res)=>{
      console.log(res.data);
      OnPayment(res.data.id)
    }, (error)=>{
      setLoading(false)
    })
  }

  
  const OnPayment= (subId)=>{
    const options  ={
      "key":process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "subscription_id":subId,
      "name":'Idea Pallet',
      description:'Monthly plan',
      handler:async(response)=>{
        console.log(response);
        if(response){
          SaveSubscription(response.razorpay_payment_id)
        }
        setLoading(false)
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const SaveSubscription = async (paymentId)=>{
    const result = await db.insert(userSubscription).values({
      email: user?.emailAddresses[0].emailAddress,
      userName: user?.fullName,
      active: true,
      paymentId:paymentId,
      joinDate:moment().format('DD/MM/YYYY')
    });
    if(result){
      window.location.reload();
    }
  }
  return (
    <div className='flex mt-16 items-center justify-center'>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className='text-center'>
        <h2 className='text-4xl mb-10 font-extrabold'>Upgrade your plan</h2>
        <div className='flex gap-5 mt-3 max-sm:flex-col'>
          <div className='bg-secondary p-10 shadow-sm text-center flex flex-col gap-4 rounded-md  min-w-[300px]'>
            <p className='font-semibold'>Free</p>
            <h3 className='text-sm mt-4'> <span className='text-3xl font-bold'>₹0</span> /monthly</h3>
            <p className='text-sm'>10,000 words limit</p>
            <p className='text-sm mb-8'>Unlimited copy</p>
            <Button disabled={true} >Active</Button>
          </div>
          <div className='bg-secondary p-10 shadow-sm text-center flex flex-col gap-4 rounded-md min-w-[300px]'>
            <p className='font-semibold'>Paid</p>
            <h3 className='text-sm mt-4'> <span className='text-3xl font-bold '>₹299</span> /monthly</h3>
            <p className='text-sm'>100,000 words limit</p>
            <p className='text-sm'>Unlimited copy</p>
            <p className='text-sm'>1 year of history</p>
            <Button disabled={currUserSubscription} onClick={()=>CreateSubscription()}>{loading ? <Loader2Icon className='animate-spin'/> : currUserSubscription ? 'Active' : 'Upgrade'}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billing