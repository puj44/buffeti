import { put, call } from "redux-saga/effects";
import { setMobileOtpResponse,isAuthenticated } from "../reducers/authReducer";
import { getOtpApi, getTokenStatusApi, signupApi, verifyOtpApi} from "../requests/authRequests";


export function* handleGetMobileOtp(action){
    try{
        const response = yield call(getOtpApi,action);
        yield put(setMobileOtpResponse(response?.response?.data || response?.data));
    }catch(err){
        console.log(err);
    }
}

export function* handleSignup(action){
    try{
        const response = yield call(signupApi,action);
        yield put(setMobileOtpResponse(response?.response?.data));
    }catch(err){
        console.log(err);
    }
}

export function* handleVerifyOtp(action){
    try{
        const response = yield call(verifyOtpApi,action);
        yield put(isAuthenticated(response?.response?.data));
    }catch(err){
        console.log(err);
    }
}

export function* handleGetTokenStatus(action){
    try{
        
        const response = yield call(getTokenStatusApi,action);
        
        let authenticated = response.status === 200 ?? false
        yield put(isAuthenticated({authenticated}));
    }catch(err){
        console.log(err);
    }
}


