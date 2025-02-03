import { put } from "../api/apiWrapper";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const customerSlice = createSlice({
    name:"customer",
    initialState:{
        profile:{},
        profileResponse:{}
    },
    reducers:{
        getProfile:(state) =>{
        },
        setProfile:(state,action) =>{
            
            state.profile = action?.payload?.data?.profile ?? {};
        },
        updateProfileAction:(state,action) =>{

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
        }
    },
});

export const {getProfile,setProfile,resetProfile,updateProfileAction,updateProfileResponse} = customerSlice.actions;

export default customerSlice.reducer;