"use client"
import axios from 'axios'
import React from 'react'

const Upgrade = () => {

  const OnCheckoutClick=async ()=>{
    const result = await axios.post('/api/payment/checkout',{
      priceId:process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY
    })

    console.log(result.data)
    window.open(result.data?.url)
  }

  return (
    <div>
      <button 
      onClick={OnCheckoutClick}
      >
        click Me
      </button>
    </div>
  )
}

export default Upgrade