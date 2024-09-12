import { call, put } from "redux-saga/effects";
import { getOrdersApi, orderPaymentApi, placeOrderApi } from "../requests/orderRequests";
import { setOrderPayment, setOrderPlaced, setOrders } from "../reducers/orderReducer";
import { setCartDetails } from "../reducers/cartReducer";
import { setToaster } from "../reducers/uiReducer";

export function* handlePlaceOrder(action){
    try{
        const response = yield call(placeOrderApi,action);
        const data = response?.response?.data || response?.data;
        
        if(data?.status === 200 || data?.statusCode === 200){
           
            yield put(setToaster({
                type:"success",
                message:"Order placed successfully!"
            }))
        }else{
            const message = data?.status === 500 || data?.statusCode === 500 ? "Something went wrong, please try again!" : data?.message
            yield put(setToaster({
                type:"error",
                message:message
            }))
        }
        yield put(setOrderPlaced(data));
        yield put(setCartDetails(data));
    }catch(err){
        console.log("PLACE ORDER ERR:",err)
    }
}
export function* handleGetOrders(action){
    try{
        const response = yield call(getOrdersApi,action);
        yield put(setOrders(response?.response?.data || response?.data));
    }catch(err){
        console.log("GET ORDER ERR:",err)
    }
}

export function* handleOrderPayment(action){
    try{
        const response = yield call(orderPaymentApi,action);
        const data = response?.response?.data || response?.data;
        
        if(data?.status === 200 || data?.statusCode === 200){
            yield put(setToaster({
                type:"success",
                message:"Payment Initialized!"
            }))
        }else{
            const message = data?.status === 500 || data?.statusCode === 500 ? "Something went wrong, please try again!" : data?.message
            yield put(setToaster({
                type:"error",
                message:message
            }))
        }
        yield put(setOrderPayment(response?.response?.data || response?.data));
    }catch(err){
        console.log("ORDER PAYMENT ERR:",err)
    }
}