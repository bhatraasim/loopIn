import React from 'react'

interface IInput{
    pageTitle?:string
    placeholder?:string
    para?:string
}

function Input({pageTitle  , placeholder , para}:IInput) {
  return (
    <div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">{pageTitle}</legend>
        <input type="text" className="input" placeholder={placeholder} />
        <p className="fieldset-label">{para}</p>
     </fieldset>
    </div>
  )
}

export default Input
