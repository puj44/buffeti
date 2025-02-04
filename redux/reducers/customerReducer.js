import { put } from "../api/apiWrapper";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const customerSlice = createSlice({
    name:"customer",
    initialState:{
        profile:{},
        profileResponse:{},
        emailOtpResponse:{},
        verifyOtpResponse:{},
    },
    reducers:{
        getProfile:(state) =>{
        },
        setProfile:(state,action) =>{
            
            state.profile = action?.payload?.data?.profile ?? {};
        },
        updateProfileAction:(state,action) =>{

        },
        sendEmailOtp:(state,action) =>{

        },
        sendEmailOtpResponse:(state,{payload}) =>{
           

            state.emailOtpResponse = {
                success:payload?.status === 200 || payload?.statusCode === 200 ?true:false
            };
        },
        verifyEmailOtp:(state,action) =>{

        },
        verifyEmailOtpResponse:(state,{payload}) =>{
            state.verifyOtpResponse = {
                success:payload?.status === 200 || payload?.statusCode === 200 ?true:false,
            };
        },
        updateProfileResponse:(state,{payload}) =>{
            const message = payload?.status === 200 || payload?.statusCode === 200 ? "Profile updated successfully!" : "Something went wrong!"
            state.profileResponse = {
                success:payload?.status === 200 || payload?.statusCode === 200 ?true:false,
                message:message
            };
        },
        resetProfile:(state) =>{
            state.profileResponse = {};
        },
        resetOtpResponse:(state) =>{
            state.emailOtpResponse = {};
            state.verifyOtpResponse = {};
        }
    },
});

export const {getProfile,setProfile,resetOtpResponse,resetProfile,updateProfileAction,updateProfileResponse, verifyEmailOtp, sendEmailOtp, verifyEmailOtpResponse, sendEmailOtpResponse} = customerSlice.actions;

export default customerSlice.reducer;