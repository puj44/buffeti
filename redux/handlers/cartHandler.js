import { put, call } from "redux-saga/effects";
import { addToCartApi, deleteCartApi, deleteCartItemApi, extraServicesApi, getCartApi, getCartDetailsApi, updateCartApi, updateCartItemApi } from "../requests/cartRequests";
import { setAddToCart, setCart, setCartDetails, setDeleteCart, setDeleteCartItem, setExtraServices, setUpdateCart, setUpdateCartItem } from "../reducers/cartReducer";


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


export function* handleCartItemUpdate(action){
    try{
        const response = yield call(updateCartItemApi,action);
        yield put(setUpdateCartItem(response?.response?.data || response?.data));
        const res = yield call(getCartApi,action);
        yield put(setCart(res?.res?.data || res?.data));
        yield put(setCartDetails(res?.res?.data || res?.data));
    }catch(err){
        
    }
}

export function* handleCartUpdate(action){
    try{
        const response = yield call(updateCartApi,action);
        yield put(setUpdateCart(response?.response?.data || response?.data));
        const res = yield call(getCartApi,action);
        yield put(setCart(res?.res?.data || res?.data));
    }catch(err){
        
    }
}
export function* handleCartDelete(action){
    try{
        const response = yield call(deleteCartApi,action);
        yield put(setDeleteCart(response?.response?.data || response?.data));
        const res = yield call(getCartApi,action);
        yield put(setCart(res?.res?.data || res?.data));
    }catch(err){
        
    }
}
export function* handleCartItemDelete(action){
    try{
        const response = yield call(deleteCartItemApi,action);
        yield put(setDeleteCartItem(response?.response?.data || response?.data));
        const res = yield call(getCartApi,action);
        yield put(setCart(res?.res?.data || res?.data));
        yield put(setCartDetails(res?.res?.data || res?.data));
    }catch(err){
        
    }
}