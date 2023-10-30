import Lottie from 'lottie-react'
import React from 'react'

import scootingCroc from '../../public/ScootingCroc.json'

type Props = {}

const Loading = (props: Props) => {
    return (
        <div className='w-1/5'>
            <Lottie animationData={scootingCroc}></Lottie>
        </div>
    )
}

export default Loading