import { call, put } from "redux-saga/effects";
import { getOrdersApi, placeOrderApi } from "../requests/orderRequests";
import { setOrderPlaced, setOrders } from "../reducers/orderReducer";

export function* handlePlaceOrder(action){
    try{
        const response = yield call(placeOrderApi,action);
        yield put(setOrderPlaced(response?.response?.data || response?.data));
    }catch(err){
        
    }
}
export function* handleGetOrders(action){
    try{
        const response = yield call(getOrdersApi,action);
        yield put(setOrders(response?.response?.data || response?.data));
    }catch(err){
        
    }
}