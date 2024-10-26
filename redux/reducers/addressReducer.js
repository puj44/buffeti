const { createSlice } = require("@reduxjs/toolkit");

export const addressSlice = createSlice({
    name:"address",
    initialState:{
        isLoading:false,
        addresses:[],
        response:false,
        errorMessage:false,
        addressRemoved:false,
        addressRemoveResponse:false,
        detectedLocation:{}
    },
    reducers:{
        getAddresses:(state) =>{
            
        },
        setAddresses:(state,{payload}) =>{
            state.addresses = payload?.data?.addresses ?? [];
        },
        detectLocation:(state)=>{

        },
        setLocation:(state,{payload})=>{
            state.detectedLocation = {...payload?.data ?? {}}
        },
        addAddress:(state) =>{
        },
        setAddAddress:(state,{payload}) =>{
            state.response = true;
            if(payload?.statusCode === 400){
                state.errorMessage = payload?.message;
            }else{
                state.addresses = payload?.data?.addresses ?? [];
            }
        },
        editAddress:(state) =>{
        },
        setEditAddress:(state,{payload}) =>{
            state.response = true;
            if(payload?.statusCode === 400){
                state.errorMessage = payload?.message;
            }else{
                state.addresses = payload?.data?.addresses ?? [];
            }
        },
        deleteAddress:(state) =>{
        },
        setDeleteAddress:(state,{payload}) =>{
            state.addressRemoveResponse = true;
            if(payload?.statusCode === 400){
                state.errorMessage = payload?.message;
            }
            if(payload?.statusCode === 200){
                state.addressRemoved = true;
                state.addresses = payload?.data?.addresses ?? [];
            }
        },
        resetAddress:(state) =>{
            state.response = false;
            state.addressRemoveResponse = false;
            state.addressRemoved = false;
            state.errorMessage = false;
            state.detectedLocation = {};
        }
    }
});

export const {
    getAddresses,
    setAddresses,
    addAddress,
    setAddAddress,
    editAddress,
    setEditAddress,
    deleteAddress,
    setDeleteAddress,
    resetAddress,
    detectLocation,
    setLocation
} = addressSlice.actions;

export default addressSlice.reducer;