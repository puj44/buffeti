const { createSlice } = require("@reduxjs/toolkit");

export const cartSlice = createSlice({
    name:"cart",
    initialState:{
        isLoading:false,
        cartDetails:{},
        cart:{},
        response:false,
        updateResponse:false,
        errorMessage:false,
        is_invalid:false,
        already_exists:false,
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
            state.cart = payload?.data?.cart ?? {};
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
            if(payload?.statusCode === 400){
            }
        },
        resetCart:(state) =>{
            state.response = false;
            state.updateResponse = false;
            state.errorMessage = false;
            state.is_invalid =  false;
            state.already_exists = false;
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
    resetCart
} = cartSlice.actions;

export default cartSlice.reducer;