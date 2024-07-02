const { createSlice } = require("@reduxjs/toolkit");

export const addressSlice = createSlice({
    name:"address",
    initialState:{
        isLoading:false,
        addresses:[],
        response:false,
        errorMessage:false,
    },
    reducers:{
        getAddresses:(state) =>{
        },
        setAddresses:(state,{payload}) =>{
            state.addresses = payload?.data?.addresses ?? [];
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
            state.response = true;
            if(payload?.statusCode === 200){
                state.addresses = payload?.data?.addresses ?? [];
            }
        },
        resetAddress:(state) =>{
            state.response = false;
            state.errorMessage = false;
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
    resetAddress
} = addressSlice.actions;

export default addressSlice.reducer;