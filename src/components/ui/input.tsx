import React from 'react'

export default function useInput(placeholder: string, spanClassName?: string, inputClassName?: string) {

  // Input
  const [inputValue, setInputValue] = React.useState('');

  // Input style
  let [ogInputClassname, setOgInputClassName] = React.useState(inputClassName)
  
  // Span style
  let [ogSpanClassName, setOgSpanClassName] = React.useState(spanClassName)

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  }
  

  // If classname value are empty set this as original value
  if(inputClassName == undefined || spanClassName == undefined || inputClassName == '' || spanClassName == '' ){
    ogInputClassname = 'w-[70vw] h-[6vh] lg:h-[5vh] px-5 py-2 my-4 text-sm leading-tight rounded-md text-gray-700 uppercase dark:text-white border  shadow appearance-none focus:outline-none focus:shadow-outline placeholder-gray-300 placeholder-opacity-0 transition duration-200'
    ogSpanClassName = 'block mb-2 text-xl text-gray-300 dark:text-white upper text-opacity-8 absolute left-1 top-6 px-1 transition duration-200 input-text'
  }

  return {
    inputValue,
    inputRender: (
    <div className=" flex justify-start items-center">
      <label className='relative cursor-pointer'>
        <input value={inputValue} onChange={handleInputChange} type="text" placeholder="Input" className={ogInputClassname} />
        <span className={ogSpanClassName}>{placeholder}</span>
      </label>
    </div>
    )
  }
}