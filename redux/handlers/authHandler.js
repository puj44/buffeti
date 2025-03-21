import { put, call } from "redux-saga/effects";
import { setMobileOtpResponse,isAuthenticated, setTokenStatus, setSignout } from "../reducers/authReducer";
import { getOtpApi, getTokenStatusApi, signoutApi, signupApi, verifyOtpApi} from "../requests/authRequests";
import { getCartDetailsApi } from "../requests/cartRequests";
import { setCartDetails } from "../reducers/cartReducer";


export function* handleGetMobileOtp(action){
    try{
        const response = yield call(getOtpApi,action);
        yield put(setMobileOtpResponse(response?.response?.data || response?.data));
    }catch(err){
        
    }
}

export function* handleSignup(action){
    try{
        const response = yield call(signupApi,action);
        yield put(setMobileOtpResponse(response?.response?.data || response?.data));
    }catch(err){
        
    }
}

export function* handleVerifyOtp(action){
    try{
        const response = yield call(verifyOtpApi,action);
        const data = response?.response?.data || response?.data;
        
        yield put(isAuthenticated(data));
        if(data?.statusCode === 200){
            const res = yield call(getCartDetailsApi,action);
            yield put(setCartDetails(res?.response?.data || res?.data));
        }
    }catch(err){
        
    }
}

export function* handleGetTokenStatus(action){
    try{
        
        const response = yield call(getTokenStatusApi,action);
        
        yield put(setTokenStatus(response?.response?.data || response?.data));
    }catch(err){
        
    }
}

export function* handleSignout(action){
    try{
        
        const response = yield call(signoutApi,action);
        
        yield put(setSignout(response?.response?.data || response?.data));
    }catch(err){
        
    }
}


