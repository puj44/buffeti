import { deleteCookie, setCookie } from "cookies-next";

const { createSlice } = require("@reduxjs/toolkit");

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoading:false,
        resendOtpCount:0,
        otpSecondsLeft:undefined,
        isAuthenticated:undefined,
        otpResponse:false,
        errorMessage:"",
        user:{}
    },
    reducers:{
        signup:(state) =>{
            state.isLoading = true;
        },
        getMobileOtp:(state) =>{
            state.isLoading = true;
        },
        verifyOtp:(state) =>{
            state.isLoading = true;
        },
        verifyEmail:(state) =>{
            state.isLoading = true;
        },
        setMobileOtpResponse:(state,action)=>{
            state.isLoading = false;
            
            if(action?.payload?.statusCode === 200 || action?.payload?.statusCode === 400){
                state.otpSecondsLeft = action?.payload?.data?.secondsLeft ?? 30
            }
            state.otpResponse = action?.payload?.statusCode ? true :false;
            state.errorMessage = action?.payload?.statusCode !== 200 ?  (action?.payload?.message ?? "Something went wrong!") :""
        },
        getTokenStatus:(state) => {
            
        },
        isAuthenticated:(state,action) =>{
            const isValid = action?.payload?.statusCode === 200;
            state.isLoading = false;
            state.isAuthenticated =isValid ?? false;
            if(isValid){        
                state.user = {
                    name:action?.payload?.data?.user?.name,
                    mobile_number:action?.payload?.data?.user?.mobile_number,
                    email:action?.payload?.data?.user?.email ?? null,
                }
            }
            state.otpResponse = action?.payload?.statusCode ? true :false;
            state.errorMessage = !isValid ?  (action?.payload?.message ?? "Something went wrong, try again!") :""
        },
        setTokenStatus:(state,action) =>{
            if(action?.payload?.statusCode !== 200 && (action?.payload?.statusCode === 403 || action?.payload?.statusCode === 401)){
                state.isAuthenticated = false;
                deleteCookie("accessToken");
            }else if(action?.payload?.statusCode === 200){
                state.isAuthenticated = true;
                state.user = {
                    name:action?.payload?.data?.user?.name,
                    mobile_number:action?.payload?.data?.user?.mobile_number,
                    email:action?.payload?.data?.user?.email ?? null,
                }
            }
        },
        signout:(state) =>{

        },
        setSignout:(state,{payload}) =>{
            if(payload?.statusCode === 200 || payload?.status === 200){
                state.isAuthenticated = false;
                deleteCookie("accessToken");
            }
        },
        resetResponse:(state) =>{
            state.otpResponse = false
            state.errorMessage = "";
            state.otpSecondsLeft = 0;
        }
        
    }
});

export const {getMobileOtp, setMobileOtpResponse, getTokenStatus, isAuthenticated, signup, resetResponse, verifyOtp, setTokenStatus, signout,setSignout} = authSlice.actions;

export default authSlice.reducer;