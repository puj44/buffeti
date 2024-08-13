const { createSlice } = require("@reduxjs/toolkit");

export const orderSlice = createSlice({
    name:"order",
    initialState:{
        orderPlaceResponse:{},
        orders:[],
    },
    reducers:{
        placeOrder:(state) =>{

        },
        setOrderPlaced:(state,{payload}) =>{
            console.log("placeOrder",payload);
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
        getOrders:(state) =>{

        },
        setOrders:(state,{payload}) =>{
            state.orders = payload?.data?.orderDetails ?? [];
        },
        resetAction:(state) =>{
            state.orderPlaceResponse = {};
        }
    }
});

export const {placeOrder, setOrderPlaced,getOrders, setOrders,resetAction} = orderSlice.actions;

export default orderSlice.reducer;