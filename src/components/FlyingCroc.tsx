'use client'
import React from 'react'
import flyingCroc from '../../public/FlyingCroc.json'
import Lottie from "lottie-react";

import '../styles/movement.css'

type Props = {}

const FlyingCroc = (props: Props) => {
  return (
    <div className='absolute w-1/3 lg:w-[13%] top-20 croc'>
        <Lottie animationData={flyingCroc}></Lottie>
    </div>
  )
}

export default FlyingCroc