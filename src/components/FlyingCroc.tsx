'use client'
import React from 'react'
import flyingCroc from '../../public/FlyingCroc.json'
import Lottie from "lottie-react";

import '../styles/movement.css'

type Props = {}

const FlyingCroc = (props: Props) => {
  return (
    <div className=' w-[25%] lg:w-[8%] md:w-[5%] absolute h-0 top-[-56%] lg:top-[-50%] z-[-100] croc'>
        <Lottie animationData={flyingCroc}></Lottie>
    </div>
  )
}

export default FlyingCroc