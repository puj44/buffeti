import { put, call } from "redux-saga/effects";
import { setMobileOtpResponse,isAuthenticated, setTokenStatus, setSignout } from "../reducers/authReducer";
import { getOtpApi, getTokenStatusApi, signoutApi, signupApi, verifyOtpApi} from "../requests/authRequests";


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
        yield put(setMobileOtpResponse(response?.response?.data));
    }catch(err){
        
    }
}

export function* handleVerifyOtp(action){
    try{
        const response = yield call(verifyOtpApi,action);
        yield put(isAuthenticated(response?.response?.data || response?.data));
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


