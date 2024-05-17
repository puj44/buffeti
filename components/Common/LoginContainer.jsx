import Image from 'next/image'
import React from 'react'
import OTPInput from 'react-otp-input'

function LoginContainer({step,changeStep, onInputChange, values,error,changeNumber,sendOTP,handleModelClick,verifyOtp, timer}) {

    const renderElement = () =>{
        switch(step){
            case "login":
                return(
                    <>
                        <div className='flex flex-col gap-2'>
                            <div className='input-group'>
                                <p>+91</p>
                                <input  
                                    id="login_mobile_number"
                                    onChange={(e)=>{ onInputChange(e, "mobile_number")}} 
                                    placeholder='Phone Number' 
                                    value={values?.mobile_number ?? ''} />
                            </div>
                            {error && <span className={'text-color-secondary-red'} id="login-error">{error}</span>}
                        </div>
                        <button className='btn primary-btn' onClick={()=>{sendOTP()}}>{"Send OTP"}</button>
                        <div className='grid grid-cols-[auto_5%_auto] gap-3 items-center'>
                            <div className=' border-[#A8A8AD] border-[0.5px] h-[1px] '></div>
                            <p className='text-color-secondary-gray'>Or</p>
                            <span className=' border-[#A8A8AD] border-[0.5px] h-[1px]'></span>
                        </div>
                        <div className='flex flex-row gap-2  ' >
                            <p>New to Buffeti? </p>
                            <p className='font-medium text-color-primary cursor-pointer' onClick={()=>{changeStep("register")}}>{" Create an account"}</p>
                        </div>
                    </>
                )
            case "register":
                return(
                    <>
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-col gap-2'>
                                <div className='input-group'>
                                    <p>+91</p>
                                    <input  
                                        id={"register_mobile_number"}
                                        onChange={(e)=>{ onInputChange(e, "mobile_number")}} 
                                        placeholder='Phone Number' 
                                        value={values?.mobile_number ?? ''} />
                                </div>
                                { error && <span className='text-color-secondary-red' id="register-error">{error}</span>}
                            </div>
                            <div className='input-group'>
                                <input  
                                    id={"full_name"}
                                    onChange={(e)=>{ onInputChange(e, "full_name")}} 
                                    placeholder='Full Name' 
                                    value={values?.full_name ?? ''} />
                            </div>
                        </div>
                        <button className='btn primary-btn' onClick={()=>{sendOTP()}}>{"Send OTP"}</button>
                        <div className='grid grid-cols-[auto_5%_auto] gap-3 items-center'>
                            <div className=' border-[#A8A8AD] border-[0.5px] h-[1px] '></div>
                            <p className='text-color-secondary-gray'>Or</p>
                            <span className=' border-[#A8A8AD] border-[0.5px] h-[1px]'></span>
                        </div>
                        <div className='flex flex-row gap-2 ' >
                            <p>Already have an account? </p>
                            <p className='font-medium text-color-primary cursor-pointer' onClick={()=>{changeStep("login")}}>{" Sign in now"}</p>
                        </div>
                    </>
                )
            case "otp_verification":
                return(
                    <>
                     <div className='flex flex-row justify-between align-top gap-2 '>
                        <p>{`Enter 4 digit code we sent to the mobile `}<span className='font-medium'>{` +91 ${values?.mobile_number}`}</span></p>
                        <span className='text-color-primary font-medium cursor-pointer' onClick={()=>{changeNumber();}}>{"Change"}</span>
                     </div>
                     <div className='flex flex-col gap-2'>
                        <div>
                            <OTPInput
                                value={values?.otp ?? ""}
                                onChange={(code)=>{onInputChange(code,"otp")}}
                                numInputs={4}
                                // separator={<span style={{ width: "10px" }}></span>}
                                // renderSeparator={<span style={{ width: "10px" }}></span>}
                                isInputNum={true}
                                shouldAutoFocus={true}
                                renderInput={(props) => <input {...props} />}
                                containerStyle={{
                                    justifyContent:"space-between"
                                }}
                                inputType='tel'
                                inputStyle={{
                                    border: `1px solid ${error ?"#D92D20":"#E3E5E5"}`,
                                    borderRadius: "8px",
                                    width: "59px",
                                    height: "48px",
                                    fontSize: "16px",
                                    color: "#1E1E24",
                                    fontWeight: "400",
                                    outline: "none",
                                    caretColor: "#1E1E24"
                                }}
                            />
                        </div>
                        { error && <span className='text-color-secondary-red' id="register-error">{error}</span>}
                     </div>
                     <button className='btn primary-btn' onClick={()=>{verifyOtp()}}>{"Continue"}</button>
                     <div className='flex flex-row justify-between gap-1 '>
                            <p>{"Didn't receive code? "}&nbsp;<span className={`${timer === 0 ?"text-color-primary cursor-pointer" :""} font-medium`}>{" Resend Code"}</span></p>
                            {timer > 0 && <p className='text-color-secondary-gray'>{"00:"+timer}</p> }
                            
                     </div>
                    </>
                )
            default:
                return;
            
        }
       
    }
  return (
    <div className='flex flex-col gap-0'>
        {/* TITLE DIV */}
           <div className='hidden p-[24px] pb-0 md:flex flex-row justify-between items-center'>
                <p className='sub-title font-medium'>{step === "login" ? "Login" : step === "register" ? "Register" :"OTP Verification"}</p>
                <div className='cursor-pointer' onClick={()=>{handleModelClick(false)}}>
                    <Image
                        src={"/icons/cross.webp"}
                        width={13}
                        height={13}
                        alt={"Close"}
                    />
                </div>
            </div>
            <div className='px-[20px] pt-[11px] h-[177px]  m-0 relative block md:hidden bg-[#F5F5F5] '>
                <div className='grid grid-rows-[50%_50%] h-full '>
                    <div onClick={()=>{handleModelClick(false)}} className='pt-5'>
                        <Image
                            src={"/arrows/l_arrow_d.webp"}
                            width={8}
                            height={14}
                            alt={"Close"}
                            
                        />
                    </div>
                    <div className='grid grid-flow-row gap-2  self-start '>
                        <p className='sub-title font-medium'>{step === "login" ? "Login" : step === "register" ? "Register" :"OTP Verification"}</p>
                        <p className='text-color-dark-gray flex small-title max-w-[50%] xs:max-w-[100%]'>{step === "login" || step === "register" ? "Enter mobile number to continue":""}</p>
                    </div>
                </div>
                <div className='absolute right-0 bottom-0'>
                    <Image
                        src={"/logo/logo_primary.webp"}
                        width={2049}
                        height={1354}
                        style={{
                            width:"152px",
                            height:"100px",
                            opacity:0.25,
                            
                        }}
                        className='grayscale-[100%]'
                        alt={"Buffeti"}
                    />

                </div>
            </div>
            {/* CONTAINER DIV */}
            <div className='p-[24px] flex flex-col gap-6'>
                {renderElement()}
            </div>

    </div>
  )
}

export default LoginContainer