import clsx from "clsx"
import React, { useState } from "react"
type Props = {
  steps: number
}
const ProgressSteps: React.FC<Props> = ({ steps }) => {
  const stepArray: Array<Number> = Array.from({ length: steps }, (_, k) => k)
  const [current, setCurrent] = useState(0)
  return (
    <div className="w-96 h-32 flex flex-col gap-3 my-0 mx-auto items-center justify-center">
      <div className="justify-center flex items-center">
        {
          stepArray.map((_, index) => {
            return (
              <>
                <div className={clsx("w-8 h-8 rounded-full bg-sky-50 text-center leading-[24px] border-4  border-sky-900 select-none transition-all ease-in-out duration-1000", { 'border-sky-200': current < index })}>
                  {index}
                </div>
                {index !== steps - 1 ?
                  <div className={clsx("w-12 h-1 select-none transition-all duration-1000", current < (index+1)?'bg-sky-200' : 'bg-sky-900')}>
                  </div> : <></>
                }
              </>
            )
          })
        }
      </div>
      <div className="h-full w-full flex gap-5 justify-center">
        <button className={clsx("bg-sky-200 h-8 w-16 rounded-lg select-none hover:bg-sky-300 disabled:bg-gray-400")} disabled={current == 0} onClick={() => setCurrent(current - 1)}>Prev</button>
        <button className="bg-sky-200 h-8 w-16 rounded-lg select-none hover:bg-sky-300  disabled:bg-gray-400" disabled={current == steps - 1} onClick={() => setCurrent(current + 1)}>Next</button>
      </div>
    </div >
  )
}

export default ProgressSteps
