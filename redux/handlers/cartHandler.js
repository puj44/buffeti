import { put, call } from "redux-saga/effects";
import { addToCartApi, getCartDetailsApi } from "../requests/cartRequests";
import { setAddToCart, setCartDetails } from "../reducers/cartReducer";


export function* handleGetCartDetails(action){
    try{
        const response = yield call(getCartDetailsApi,action);
        yield put(setCartDetails(response?.response?.data || response?.data));
    }catch(err){
        
    }
}

export function* handleAddToCart(action){
    try{
        const response = yield call(addToCartApi,action);
        yield put(setAddToCart(response?.response?.data || response?.data));
        const res = yield call(getCartDetailsApi,action);
        yield put(setCartDetails(res?.res?.data || res?.data));
    }catch(err){
        
    }
}

