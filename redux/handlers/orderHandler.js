import { call, put } from "redux-saga/effects";
import { getOrdersApi, orderPaymentApi, placeOrderApi } from "../requests/orderRequests";
import { setOrderPayment, setOrderPlaced, setOrders } from "../reducers/orderReducer";

export function* handlePlaceOrder(action){
    try{
        const response = yield call(placeOrderApi,action);
        yield put(setOrderPlaced(response?.response?.data || response?.data));
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
        yield put(setOrderPayment(response?.response?.data || response?.data));
    }catch(err){
        console.log("ORDER PAYMENT ERR:",err)
    }
}