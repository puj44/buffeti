import { put, call } from "redux-saga/effects";
import { addToCartApi, extraServicesApi, getCartApi, getCartDetailsApi } from "../requests/cartRequests";
import { setAddToCart, setCart, setCartDetails, setExtraServices } from "../reducers/cartReducer";


export function* handleGetCartDetails(action){
    try{
        const response = yield call(getCartDetailsApi,action);
        yield put(setCartDetails(response?.response?.data || response?.data));
    }catch(err){
        
    }
}

export function* handleGetCartData(action){
    try{
        const response = yield call(getCartApi,action);
        yield put(setCart(response?.response?.data || response?.data));
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

export function* handleGetExtraServices(action){
    try{
        const response = yield call(extraServicesApi,action);
        yield put(setExtraServices(response?.response?.data || response?.data));
    }catch(err){
        
    }
}
