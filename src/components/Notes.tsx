'use client'
import React, { useState } from 'react'

type Props = {
    comments: string
}

const Notes = ({ comments }: Props) => {
    const [showFullText, setShowFullText] = useState(false);

    const toggleText = () => {
        setShowFullText(!showFullText);
    };

    return (
        <div className='my-3 px-0 justify-start flex flex-col place-items-start'>
            <label className='font-bold mb-2'>Notes:</label>
            {showFullText ? (
                comments
            ) : (
                <span className='-mx-4 flex justify-start items-start'>
                    {comments.slice(0, 100)} {comments.length > 100 && '...'}
                </span>
            )}
            {comments.length > 100 && (
                <div>
                    {/* <button onClick={toggleText}>
                        {showFullText ? 'Read Less' : 'Read More'}
                    </button> */}
                </div>
            )}
        </div>
    )
}

export default Notes