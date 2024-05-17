const { createSlice } = require("@reduxjs/toolkit");

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoading:false,
        otp:undefined,
        resendOtpCount:0,
        otpSecondsLeft:undefined,
        isAuthenticated:false
    },
    reducers:{
        getMobileOtp:(state) =>{
            state.isLoading = true;
        },
        setMobileOtpResponse:(state,payload)=>{
            state.otp = "123456";
            state.isLoading = false;
        },
        getTokenStatus:(state) => {
            
        },
        isAuthenticated:(state,payload) =>{
            state.isAuthenticated = payload.isAuthenticated;
            // state.isAuthenticated = true;
        }
        
    }
});

export const {getMobileOtp, setMobileOtpResponse, getTokenStatus, isAuthenticated} = authSlice.actions;

export default authSlice.reducer;