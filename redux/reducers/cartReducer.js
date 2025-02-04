const { createSlice } = require("@reduxjs/toolkit");

export const cartSlice = createSlice({
    name:"cart",
    initialState:{
        isLoading:false,
        cartDetails:{},
        cart:{},
        extraServices:[],
        response:false,
        updateResponse:false,
        errorMessage:false,
        is_invalid:false,
        already_exists:false,
        deleteResponse:false,
        redirect:false,
        couponMessage:"",
    },
    reducers:{
        getCartDetails:(state) =>{
            
        },
        setCartDetails:(state,{payload}) =>{
            state.cartDetails = payload?.data?.cartDetails ?? {};
        },
        getCart:(state) =>{

        },
        setCart:(state,{payload}) =>{
            if(payload?.statusCode === 200){
                state.cart = payload?.data?.cart ?? {};
            }
        },
        addToCart:(state) =>{

        },
        setAddToCart:(state,{payload}) =>{
            state.response = true;
            if(payload?.statusCode === 400){
                state.is_invalid = payload.is_invalid ?? false;
                state.already_exists = payload.already_exists ?? false;
            }
        },
        updateCart:(state) =>{

        },
        setUpdateCart:(state,{payload}) =>{
            state.updateResponse = true;
            if(payload?.statusCode === 400){
            }
        },
        updateCartItem:(state) =>{

        },
        setUpdateCartItem:(state,{payload}) =>{
            state.updateResponse = true;
            if(payload?.redirect ){
                state.redirect = true;
            }
            if(payload?.statusCode === 400){
            }
        },
        deleteCart:(state) =>{

        },
        setDeleteCart:(state,{payload}) =>{
            state.deleteResponse = true;
            state.redirect = true;
            if(payload?.statusCode === 400){
            }
        },
        deleteCartItem:(state) =>{

        },
        setDeleteCartItem:(state,{payload}) =>{
            state.deleteResponse = true;
            if(payload?.redirect ){
                state.redirect = true;
            }
            if(payload?.statusCode === 400){
            }
        },
        getExtraServices:(state) =>{

        },
        setExtraServices:(state,{payload}) =>{
            state.extraServices = payload?.data?.extraServices ?? [];
            if(payload?.statusCode === 400){
            }
        },
        applyCoupon:(state) =>{

        },
        setApplyCoupon:(state,{payload}) =>{
            if(payload?.statusCode === 400){
                state.couponMessage = payload?.message ?? "";
            }
            else{
                state.couponMessage = false;
            }
        },
        removeCoupon:(state) =>{

        },
        setRemoveCoupon:(state,{payload}) =>{
            if(payload?.statusCode === 400){
                state.couponMessage = payload?.message ?? "";
            }else{
                state.couponMessage = false;
            }
        },
        resetCart:(state) =>{
            state.response = false;
            state.updateResponse = false;
            state.errorMessage = false;
            state.is_invalid =  false;
            state.already_exists = false;
            state.deleteResponse = false;
            state.redirect = false;
        }
    }
});

export const {
    getCartDetails,
    setCartDetails,
    getCart,
    setCart,
    addToCart,
    setAddToCart,
    updateCart,
    setUpdateCart,
    updateCartItem,
    setUpdateCartItem,
    getExtraServices,
    setExtraServices,
    deleteCart,
    setDeleteCart,
    deleteCartItem,
    setDeleteCartItem,
    applyCoupon,
    setApplyCoupon,
    removeCoupon,
    setRemoveCoupon,
    resetCart
} = cartSlice.actions;

export default cartSlice.reducer;