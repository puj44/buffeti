import React, { useEffect, useState } from 'react'

function CookingInstruction({handleChangeInstruction, value}) {
  const [val, setVal] = useState(value);
  useEffect(()=>{
    setVal(value)
  },[value])
  return (
    <div className='border-[1px] border-[#A8A8AD80] rounded-lg w-full flex flex-col p-4 gap-6'>
        <p>{"Add any cooking instructions"}</p>
        <div className='input-container w-full' style={{boxShadow: "0px 1px 2px 0px #1018280D"}}>
            <input
                placeholder='Make veggies a bit spicy'
                value={val ?? ""}
                style={{color:"#595959"}}
                onChange={(e)=>{
                  if(/^[a-zA-Z0-9._%+-@ ]*$/.test((e.target.value?.toString()?.trim()))){
                    setVal(e.target.value?.toString());
                    handleChangeInstruction(e.target.value?.toString())
                  }
                }}
            />
        </div>
    </div>
  )
}

export default CookingInstruction