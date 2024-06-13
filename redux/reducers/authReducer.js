const { createSlice } = require("@reduxjs/toolkit");

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoading:false,
        resendOtpCount:0,
        otpSecondsLeft:undefined,
        isAuthenticated:false,
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
        setMobileOtpResponse:(state,action)=>{
            state.isLoading = false;
            if(action?.payload?.statusCode === 200 || action?.payload?.statusCode === 400){
                state.otpSecondsLeft = action?.payload?.data?.secondsLeft ?? 30
            }
            state.otpResponse = action?.payload?.statusCode ? true :false;
            state.errorMessage = action?.payload?.statusCode !== 200 ?  (action?.payload?.message ?? "") :""
        },
        getTokenStatus:(state) => {
            
        },
        isAuthenticated:(state,action) =>{
            state.isLoading = false;
            state.isAuthenticated = action?.payload?.statusCode === 200 ?? false;
            state.user = {
                name:action?.payload?.data?.user?.name,
                mobile_number:action?.payload?.data?.user?.mobile_number,
                email:action?.payload?.data?.user?.email ?? null,
            }
            state.otpResponse = action?.payload?.statusCode ? true :false;
            state.errorMessage = action?.payload?.statusCode !== 200 ?  (action?.payload?.message ?? "") :""
        },
        resetResponse:(state) =>{
            state.otpResponse = false
            state.errorMessage = ""
        }
        
    }
});

export const {getMobileOtp, setMobileOtpResponse, getTokenStatus, isAuthenticated, signup, resetResponse, verifyOtp} = authSlice.actions;

export default authSlice.reducer;