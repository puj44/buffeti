const { createSlice } = require("@reduxjs/toolkit");

export const orderSlice = createSlice({
    name:"order",
    initialState:{
        orderPlaceResponse:{},
        orders:[],
        orderPaymentResponse:{},
        orderDetails:{}
    },
    reducers:{
        placeOrder:(state) =>{

        },
        setOrderPlaced:(state,{payload}) =>{
            if(payload?.status === 200 || payload?.statusCode === 200){

                state.orderPlaceResponse = {
                    success:true,
                    data:payload?.data
                }
            }else{
                state.orderPlaceResponse = {
                    error:true
                }
            }
        },
        orderPayment:(state) =>{

        },
        setOrderPayment:(state,{payload}) =>{
            if(payload?.status === 200 || payload?.statusCode === 200){

                state.orderPaymentResponse = {
                    success:true,
                    data:payload?.data
                }
            }else{
                state.orderPaymentResponse = {
                    error:true
                }
            }
        },
        getOrders:(state) =>{

        },
        setOrders:(state,{payload}) =>{
            state.orders = payload?.data?.orderDetails ?? [];
        },
        getOrderDetails:() =>{

        },
        setOrderDetails:(state,{payload}) =>{
            state.orderDetails = payload?.data?.orderDetails ?? {};
        },
        resetAction:(state) =>{
            state.orderPlaceResponse = {};
        }
    }
});

export const {placeOrder, setOrderPlaced,orderPayment , setOrderPayment, getOrders, getOrderDetails, setOrderDetails, setOrders,resetAction} = orderSlice.actions;

export default orderSlice.reducer;