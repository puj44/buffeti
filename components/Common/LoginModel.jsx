import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import LoginContainer from './LoginContainer';

function LoginModel({handleModelClick, isModalOpen}) {
    const [step, setStep] = useState("login");
    const [prevStep, setPrevStep] = useState();
    const [values, setValues] = useState({});
    const [error, setError] = useState(false);
    const [timer,setTimer] = useState(0);

    const changeStep = (val) =>{
        if(val !== "otp_verification"){
            setValues({});
        }
        setError(false);
        setStep(val);
    } 

    const changeNumber = () =>{
        setStep(prevStep);
    }

    const onInputChange =(e, field) =>{
        if(field === "otp" || (field === "full_name" && /^[A-Za-z ]*$/.test((e.target.value?.toString()?.trim())) ) || ( field === "mobile_number" && (/^[0-9]\d*$/g.test(e.target.value) && e.target.value?.length <= 10) || e.target.value === "")){
            setValues({...values,[field]:field === 'otp' ? e :e.target.value})
        }else{
            e.preventDefault();
        }
    }

    const sendOTP = () =>{
        if(values?.mobile_number?.length !== 10){
            setError("Mobile Number must be 10 digits");
            return;
        }
        if(step === "register"){
            if(values?.full_name?.length <= 2){
                setError("Full Name must be at least 3 characters");
                return;
            }
        }
        if(timer === 0){
            setTimer(30);
        }
        setPrevStep(step);
        changeStep("otp_verification");
    }
    useEffect(()=>{
        let interval;
        if(timer <= 30 & timer > 0){
            interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    },[timer])
    const verifyOtp = () =>{
        if(values?.otp?.length !== 4){
            setError("OTP must be 4 digits");
            return;
        }
        handleModelClick(false);
    }

    if(isModalOpen )
    return (
        <div className='fixed z-50 left-0 top-0  overflow-hidden w-dvw h-dvh bg-[rgb(0,0,0,0.3)] '>
            <div className="relative w-full h-full flex justify-center align-middle ">
                <div className='bg-white  relative w-full h-full md:w-[400px] md:h-[493px] my-auto  rounded-lg '>
                    <LoginContainer 
                        handleModelClick={handleModelClick}
                        step={step} 
                        changeStep={changeStep} 
                        changeNumber={changeNumber} 
                        error={error} 
                        onInputChange={onInputChange} 
                        values={values}
                        sendOTP={sendOTP}
                        verifyOtp={verifyOtp}
                        timer={timer}
                    />
                </div>
            </div>
        </div>
  )
}

export default LoginModel