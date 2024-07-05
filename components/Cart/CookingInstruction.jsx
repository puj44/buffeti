import React, { useState } from 'react'

function CookingInstruction({handleChangeInstruction, value}) {
  return (
    <div className='border-[1px] border-[#A8A8AD80] rounded-lg w-full flex flex-col p-4 gap-6'>
        <p>{"Add any cooking instructions"}</p>
        <div className='input-container w-full' style={{boxShadow: "0px 1px 2px 0px #1018280D"}}>
            <input
                placeholder='Make veggies a bit spicy'
                value={value ?? ""}
                style={{color:"#595959"}}
                onChange={(e)=>{/^[a-zA-Z0-9._%+-@ ]*$/.test((e.target.value?.toString()?.trim())) && handleChangeInstruction(e.target.value?.toString()?.toUpperCase())}}
            />
        </div>
    </div>
  )
}

export default CookingInstruction