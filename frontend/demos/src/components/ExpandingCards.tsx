import clsx from "clsx"
import { useState } from "react"

const ExpandingCards:React.FC=()=>{
  const cards:Array<Number> = [1,2,3,4,5]
  const [active,setActive]=useState(0)

  return (
    <div className="w-full h-full flex gap-5 items-center justify-center my-0 mx-auto select-none px-32">
      {
        cards.map((_,index)=>{
          return (
            <div className={clsx([
               "bg-blue-400",
               "h-3/4",
               "w-32",
               "rounded-3xl",
               "transition-all",
               "ease-in-out",
               "duration-1000",
               'object-cover',
               active==index?'flex-[5_1_0%]':'flex-1'
            ])} key={index} onClick={()=>setActive(index)}>
              
            </div>
          )
        })
      }
    </div>
  )
}
export default ExpandingCards
