import React, { ReactNode } from 'react'

interface ICard_sm {
    cardTitle?:string
    para?:string |React.ReactNode
    btn_text?:string


}

function Card_sm({ cardTitle, para , btn_text } :ICard_sm) {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{cardTitle}</h2>
    <p>{para}</p>
    <div className="card-actions w-full">
      <button className=" btn w-full text-white bg-[#1C836D]">{btn_text}</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Card_sm
