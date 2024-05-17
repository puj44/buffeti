const { createSlice } = require("@reduxjs/toolkit");

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoading:false,
        otp:undefined,
        resendOtpCount:0,
        otpSecondsLeft:undefined
    },
    reducers:{
        getMobileOtp:(state) =>{
            state.isLoading = true;
        },
        setMobileOtpResponse:(state,payload)=>{
            state.otp = "123456";
            state.isLoading = true;
        }
    }
});

export const {getMobileOtp, setMobileOtpResponse} = authSlice.actions;

export default authSlice.reducer;