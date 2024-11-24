import { useCallback, useEffect, useState } from "react";

const useRecaptcha = () =>{
    const [isRecaptchaReady, setRecaptchaReady] = useState(false);
    useEffect(()=>{
        if(window.grecaptcha){
            setRecaptchaReady(true)
        } else{
            const script = document.createElement("script");
            script.src =
              `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_SITE_KEY}`;
            script.defer = true;
            script.async = true;
            document.body.appendChild(script);
            script.onload = () =>{setRecaptchaReady(true)}
        }
       
        
    },[])

    const executeRecaptcha = useCallback(async(action)=>{
        if(isRecaptchaReady && window.grecaptcha){
            const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_SITE_KEY,{action});
            return token
        }
    },[isRecaptchaReady])

    return executeRecaptcha
}

export default useRecaptcha