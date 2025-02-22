import { put, call } from "redux-saga/effects";
import { addToCartApi, applyCouponApi, deleteCartApi, deleteCartItemApi, extraServicesApi, getCartApi, getCartDetailsApi, removeCouponApi, updateCartApi, updateCartItemApi } from "../requests/cartRequests";
import { setAddToCart, setApplyCoupon, setCart, setCartDetails, setDeleteCart, setDeleteCartItem, setExtraServices, setRemoveCoupon, setUpdateCart, setUpdateCartItem } from "../reducers/cartReducer";
import { setToaster } from "../reducers/uiReducer";


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
        // const res = yield call(getCartDetailsApi,action);
        yield put(setCartDetails(response?.response?.data || response?.data));
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
        const data = response?.response?.data || response?.data
        if(data?.statusCode !==200){
            yield put(setToaster({
                type:"error",
                message:"Something went wrong, try again!"
            }))
        }
        yield put(setUpdateCartItem(response?.response?.data || response?.data));
        yield put(setCart(response?.response?.data || response?.data));
        yield put(setCartDetails(response?.response?.data || response?.data));
    }catch(err){
        
    }
}

export function* handleCartUpdate(action){
    try{
        const response = yield call(updateCartApi,action);
        const data = response?.response?.data || response?.data
        if(data?.statusCode !==200){
            yield put(setToaster({
                type:"error",
                message:"Something went wrong, try again!"
            }))
        }
        yield put(setUpdateCart(response?.response?.data || response?.data));
        yield put(setCart(response?.response?.data || response?.data));
        
    }catch(err){
        
    }
}
export function* handleCartDelete(action){
    try{
        const response = yield call(deleteCartApi,action);
        yield put(setDeleteCart(response?.response?.data || response?.data));
        const res = yield call(getCartApi,action);
        yield put(setCart(res?.response?.data || res?.data));
        yield put(setCartDetails(response?.response?.data || response?.data));
    }catch(err){
        
    }
}
export function* handleCartItemDelete(action){
    try{
        const response = yield call(deleteCartItemApi,action);
        yield put(setDeleteCartItem(response?.response?.data || response?.data));
        yield put(setCart(response?.response?.data || response?.data));
        yield put(setCartDetails(response?.response?.data || response?.data));
    }catch(err){
        
    }
}

export function* handleApplyCoupon(action){
    try{
        const response = yield call(applyCouponApi,action);
        yield put(setApplyCoupon(response?.response?.data || response?.data));
        yield put(setCart(response?.response?.data || response?.data));
    }catch(err){
        
    }
}

export function* handleRemoveCoupon(action){
    try{
        const response = yield call(removeCouponApi,action);
        yield put(setRemoveCoupon(response?.response?.data || response?.data));
        yield put(setCart(response?.response?.data || response?.data));
    }catch(err){
        
    }
}